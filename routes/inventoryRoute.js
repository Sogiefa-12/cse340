// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const validate = require('express-validator');
// // // Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);



// /* ************************
// * Single Vehicle Details
// ************************** */

// Route to build single inventory view
router.get("/detail/:id", invController.getVehicleDetail);

// Render management view
router.get("/management", invController.management);


// // Add inventory item GET route
// router.get("/add-inventory-item", invController.addInventoryItem);

// Add classification GET route
router.get("/add-classification", async(req, res) => {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    nav
  });
});

// Add inventory item GET route
router.get("/add-inventory-item", async(req, res) => {
  let nav = await utilities.getNav();
  res.render("inventory/add-inventory-item", {
    nav
  });
});

router.post("/add-inventory-item", invController.addInventoryItem);


// Add classification POST route with validation rules
router.post(
  "/add-classification",
  invController.addClassification
);




module.exports = router




