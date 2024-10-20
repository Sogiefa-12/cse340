// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const Util = require("../utilities/index")
// // // Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);



// /* ************************
// * Single Vehicle Details
// ************************** */

// Route to build single inventory view
router.get("/inv/type/:id", Util.handleErrors((req, res, next) => {
  invController
  .getInventoryDetail(req.params.id)
  .then((data) => {
  const html = Util.formatVehicleInfo(data)
  res.render("../inventory/detail", {
    title: data.make + " " + data.model,
    carInfo: html
})
})
.catch(next)
}))



module.exports = router
