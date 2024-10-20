const express = require('express')
const router = new express.Router()
const Util = require("../utilities/index")
accountController = require("../controllers/accountsController")

// Add the "GET" route for the path that will be sent when the "My Account" link is clicked
router.get("/account", Util.handleErrors((req, res, next) => {
    // Call the function from the accounts controller to handle the request
accountsController.buildLogin(req, res, next)
}))
// Export the route(s) for use elsewhere
module.exports = router
