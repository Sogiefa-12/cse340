const utilities = require('../utilities')
const accountModel = require('../models/account-model')
const bcrypt = require("bcryptjs")
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


/* **********************************
Check data and return errors or continue to login
****************************** */
const loginValidation = async (req, res, errors) => {
  const { account_email, account_password } = req.body
  const validationResult = validationResult(req)
  const nav = await utilities.getNav()

  if (!validationResult.isEmpty()) {
    res.locals.messages = errors
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      })
      } else {
      let results = await accountModel.checkLoginData(account_email, account_password)
      if (results) {
      next()
      } else {
        errors.push({ message: "Invalid credentials. Please try again." })
res.locals.messages = errors
res.render("account/login", {
errors,
title: "Login",
nav,
})
}
}
}


   
module.exports = {buildLogin, buildRegister, registerAccount, accountModel, loginValidation}

module.exports.loginValidation = loginValidation

