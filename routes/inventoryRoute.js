// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const Util = require("../utilities/index")
// // // Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// // Route to build inventory detail view
// router.get('/type/:id', invController.getInventoryDetail);




/* ************************
 * Vehicles by classification
 ************************** */


// router.get("/type/:classificationId", (req, res, next) => {
//     invController
//       .buildByClassificationId(req.params.classificationId)
//       .then(data => {
//         res.render("inventory/classification", {
//           title: "CSE Motors Vehicle Inventory by Classification",
//           classifications: data
          
// })
// })
// .catch(next)
// })

// /* ************************
// * Single Vehicle Details
// ************************** */

router.get("/type/:id", Util.handleErrors((req, res, next) => {
    invController
      .getInventoryDetail(req.params.id)
      .then((data) => {
        const html = Util.formatVehicleInfo(data)
        res.render("inventory/detail", {
            
title: data.make + " " + data.model,
carInfo: html
})
})
.catch(next)
}))

module.exports = router
