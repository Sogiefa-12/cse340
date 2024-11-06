const utilities = require('../utilities');
const accountModel = require('../models/account-model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { resetPassword } = require('../models/account-model');

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();

  // req.flash("error", "Password must be a minimum of 12 characters and must contain 1 number, capital letter and a special character");
  res.render("account/login", {
    title: "Login",
    nav,
    locals: res.locals,
    flash:req.flash("error", "Password must be a minimum of 12 characters and must contain 1 number, capital letter and a special character")
  });
}

/* *******************
* Deliver registration view
* ********************/

async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
    flash: req.flash(),
  });
;
}


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  // Hash the password before storing
  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    console.error("[registerAccount] Error occurred during password hashing: " + error.message);
    req.flash("notice", 'Sorry, there was an error processing the registration.');
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    });
  }

  const regResult = await accountModel.registerAccount(

    account_email,
    hashedPassword
  );
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    );
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      flash: req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`)
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }

}

// Process Login
async function accountLogin(req, res) {
  let nav = await utilities.getNav();
  const { account_email, account_password } = req.body;

  try {
    const accountData = await accountModel.checkLoginData(account_email, account_password);
    if (!accountData) {
      req.flash("error_msg", "Please check your credentials and try again.");
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
    }

    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password;
      const accessToken = jwt.sign(
        accountData,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 * 1000 }
      );

      if (process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 });
      }

      return res.redirect("/account/management");
    } else {
      req.flash("error_msg", "Please check your credentials and try again.");
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
    }
  } catch (error) {
    req.flash("error_msg", "An error occurred. Please try again later.");
    return res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    });
  }
}



const manageLogin = async (req, res) => {
  const nav = await utilities.getNav();

  res.render("account/management", {
    messages: req.flash("info"),
    errors: req.flash("error"),
    title: "Account Management",
    nav
  });

};

const manageAccountUpdate = async (req, res) => {
  console.log("[manageAccountUpdate] Function started");

  const nav = await utilities.getNav();
  const { account_id } = req.body;
  const accountData = await accountModel.getAccountData(account_id);


  res.render('account/update', {
    title: 'Account Update',
    nav,
    accountData,
  });

 
};

const processAccountUpdate = async (req, res) => {
  
  const { firstName, lastName, email, account_id } = req.body;
if (email && emailExists(email)) {
req.flash('error', 'Email address already exists!');
return res.redirect('/account/update');
}
const account = await accountModel.updateAccountInfo(firstName, lastName, email, account_id);
if (!account) {
req.flash('error', 'Failed to update account information');
} else {
req.flash('success', 'Account updated successfully!');
}
res.redirect('/account/management');
};


const managePasswordChange = async (req, res) => {
console.log("[managePasswordChange] Function started");
const nav = await utilities.getNav();
const { account_id } = req.body;
const accountData = await accountModel.getAccountData(account_id);
console.log("[managePasswordChange] Retrieved account data for password change");
res.render('account/password', {
title: 'Change Password',
nav,
accountData,
});

};
const processPasswordChange = async (req, res) => {
console.log("[processPasswordChange] Function started");
const { account_id, newPassword } = req.body;
if (!isValidPassword(newPassword)) {
req.flash('error', 'Invalid password! It must contain at least 1 number, 1 capital letter, 1 lowercase letter, and be at least 8 characters long');
return res.redirect('/account/password');
}
const account = await accountModel.updatePassword(newPassword, account_id);
if (!account) {
req.flash('error', 'Failed to update password');
} else {
req.flash('success', 'Password updated successfully!');
}
res.redirect('/account/management');
};


const getResetPassword = async (req, res) => {
  const nav = await utilities.getNav();
  res.render('account/reset-password', {
    title: 'Reset Password',
    nav,


  });
};


const postResetPassword = async (req, res) => {
  const { new_password, account_email } = req.body;

  // Check if email is provided
  if (!account_email) {
    // Return an error if the email is not provided
    return res.status(400).json({ error: 'Email is required' });
  }

  // Validate the email format
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(account_email)) {
    // Return an error if the email format is invalid
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Generate access token
  const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 3600 * 1000, // 1 hour
  });

  try {
    // Perform the password reset using the retrieved email
    await resetPassword(account_email, new_password);

    // Send access token in cookie
    if (process.env.NODE_ENV === 'development') {
      res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
    } else {
      res.cookie('jwt', accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 });
    }

    // Redirect to account management page
    res.redirect('/account/management');
  } catch (err) {
    // Return an error if password reset fails
    req.flash('error_msg', 'An error occurred. Please try again later.');
    res.status(400).render('account/reset-password');
  }
};


module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  manageLogin,
  manageAccountUpdate,
  processAccountUpdate,
  managePasswordChange,
  processPasswordChange,
  getResetPassword,
  postResetPassword
  };
  