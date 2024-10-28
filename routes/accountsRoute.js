const express = require('express')
const router = new express.Router()
const utilities = require("../utilities/index");
const accountsController = require("../controllers/accountsController")
const regValidate = require('../utilities/account-validation')
const validate= require('../utilities/account-validation');
// Deliver Login View


router.get("/login", utilities.handleErrors(accountsController.buildLogin))


// Deliver Registration View
router.get("/register", utilities.handleErrors(accountsController.buildRegister))

// Process registration
router.post('/register', 
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountsController.registerAccount) 
)

// Process the login attempt
router.post('/login', validate.LoginRules, validate.checkLoginData, utilities.handleErrors(accountsController.loginValidation))

module.exports = router
