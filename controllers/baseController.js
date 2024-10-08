
// baseController file
const baseController = {
    buildHome: async function(req, res, next) {
        try {
            const nav = navigation
            res.render("index", {title: "Home", nav})
            } 
        catch (err) {
            next(err)
        }
    }
};
// await utilities.getNav()