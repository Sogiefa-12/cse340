// const express = require('express')
// const router = new express.Router()
// const utilities = require("../utilities/index");
// const accountsController = require("../controllers/accountsController")
// const regValidate = require('../utilities/account-validation')
// const validate= require('../utilities/account-validation');
// // Deliver Login View


// router.get("/login", utilities.handleErrors(accountsController.buildLogin))


// // Deliver Registration View
// router.get("/register", utilities.handleErrors(accountsController.buildRegister))

// // Process registration
// router.post('/register', 
//     regValidate.registationRules(),
//     regValidate.checkRegData,
//     utilities.handleErrors(accountsController.registerAccount) 
// )

// // Process the login attempt
// router.post('/login', regValidate.LoginRules,  regValidate.checkLoginData, utilities.handleErrors(accountsController.accountLogin))

// // Login Management view
// router.get('/management',  utilities.handleErrors(accountsController.manageLogin))


// // // Account Update Routes
// router.get('/update', utilities.checkLogin, accountsController.manageAccountUpdate);
// router.post('/update', accountsController.processAccountUpdate);



// // // Password Change Routes
// router.get('/password', accountsController.managePasswordChange);
// router.post('/password', accountsController.processPasswordChange);

// module.exports = router



const express = require('express');
const router = new express.Router();
const utilities = require("../utilities/index");
const accountsController = require("../controllers/accountsController");
const regValidate = require('../utilities/account-validation');

// Deliver Login View
router.get("/login", utilities.handleErrors(accountsController.buildLogin));

// Deliver Registration View
router.get("/register", utilities.handleErrors(accountsController.buildRegister));

// Process registration
router.post('/register',
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountsController.registerAccount)
);

// Process the login attempt
router.post('/login',
  regValidate.LoginRules,
  regValidate.checkLoginData,
  utilities.handleErrors(accountsController.accountLogin)
);

// Login Management view (Check if the user is logged in)
router.get('/management', utilities.checkLogin, utilities.handleErrors(accountsController.manageLogin));

// Account Update Routes (Check if the user is logged in)
router.get('/update', utilities.checkLogin, accountsController.manageAccountUpdate);
router.post('/update', utilities.checkLogin, accountsController.processAccountUpdate);

// Password Change Routes (Check if the user is logged in)
router.get('/password', utilities.checkLogin, accountsController.managePasswordChange);
router.post('/password', utilities.checkLogin, accountsController.processPasswordChange);

module.exports = router;