const utilities = require('../utilities')
const accountModel = require('../models/account-model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


async function buildLogin(req, res, next) {
    let nav = await utilities.getNav();
    //req.flash("error", "Password must be a minimum of 12 characters and must contain 1 number, capital letter and a special character");
    res.render("account/login", {
        title: "Login",
        nav,
        locals: res.locals
    })
}

/* *******************
* Deliver registration view
* ********************/

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
        title: "Register",
        nav,
        errors: null,
        flash: req.flash()
    })
}


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
  
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
      })
    }

  }

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if(process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      req.flash("info", "successully logged in")
      return res.redirect("/account/management")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      })
    }
  } catch (error) {
    throw new Error('Access Forbidden')
  }
}


const manageLogin = (req, res) => {
  res.render("account/management", {
      messages: req.flash("info"),
      errors: req.flash("error"),
      title: "Account Management",
      nav: "account"
  });
};
const manageAccountUpdate = async (req, res) => {
  const nav = await utilities.getNav();
  const { account_id } = req.body;
  const account = await accountModel.getAccountById(account_id);
  res.render('account/update', {
    title: 'Account Update',
    nav,
    account,
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
  const nav = await utilities.getNav();
  const { account_id } = req.body;
  const account = await accountModel.getAccountById(account_id);
  res.render('account/password', {
    title: 'Change Password',
    nav,
    account,
  });
};

const processPasswordChange = async (req, res) => {
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

module.exports = {buildLogin, buildRegister, registerAccount, accountModel, accountLogin, manageLogin,  manageAccountUpdate,
  processAccountUpdate,
  managePasswordChange,
  processPasswordChange, }



