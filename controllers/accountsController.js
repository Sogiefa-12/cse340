const utilities = require("../utilities/")

/* **********************
* Deliver Login View
* ***********************/
async function buildLogin(req, res, next){
     let nav = await utilities.getNav()
     req.flash("error", "Password must be a minimum of 12 characters and must contain 1 number, capital letter and a special character");
     res.render("account/login", {
        title: "Login",
        nav
     }, res.locals)
}

module.exports = {buildLogin}