// controllers/baseController.js
// const utils= require('./utils/index');

const baseController = {
    buildHome: async function(req, res, next) {
        try {
            const nav = navigation
            res.render("index", {title: "Home", nav:nav})
            } 
        catch (err) {
            next(err)
        } 
    }
};
module.exports = baseController;


