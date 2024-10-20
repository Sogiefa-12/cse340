const utilities = require("../utilities/")

/* **********************
* Deliver Login View
* ***********************/
async function buildLogin(req, res, next){
     let nav = await Util.getNav()
     res.render("./accounts/login", {
        title: "Login",
        nav,
     })
    
}

module.exports = {buildLogin}