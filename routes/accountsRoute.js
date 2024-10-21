const express = require('express')
const router = new express.Router()
const utilities = require("../utilities/index");
const accountsController = require("../controllers/accountsController")

// Deliver Login View


router.get("/login", utilities.handleErrors(accountsController.buildLogin) )

module.exports = router
