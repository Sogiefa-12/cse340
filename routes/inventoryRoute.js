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
router.get("/management", invController.buildManagementView);


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


// Route to Inventory in the Javascript file

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))



// Inventory edit route
router.get('/inv/edit/:inv_id', invController.editInventoryView);

router.post("/update/", invController.updateInventory)


// // Protected routes (only accessible by Employee or Admin account types)
// router.get('/protected/route1', (req, res) => {
//   // Example: Display a list of vehicles for Employee or Admin users
//   const vehicleList = getVehiclesFromDatabase();
//   res.render('vehicle_list', { vehicles: vehicleList });
// });

// router.post('/protected/route2', (req, res) => {
//   // Example: Add a new vehicle for Employee or Admin users
//   const newVehicle = {
//     // Parse vehicle data from the request body
//     // Example: newVehicle.make = req.body.make
//     // Example: newVehicle.model = req.body.model
//   };

//   // Example: Store the new vehicle in the database
//   const result = addVehicleToDatabase(newVehicle);
//   if (result) {
//     req.flash('success_msg', 'New vehicle added successfully!');
//   } else {
//     req.flash('error_msg', 'Error adding new vehicle.');
//   }
//   res.redirect('/protected/route1');
// });



// // Unprotected routes (classification or detail views)
// app.get('/unprotected/route1', (req, res) => {
//   // Example: Display a vehicle detail view
//   const vehicleId = req.query.vehicleId;
//   const vehicleDetail = getVehicleDetailFromDatabase(vehicleId);
//   res.render('vehicle_detail', { vehicle: vehicleDetail });
// });

// app.get('/unprotected/route2', (req, res) => {
//   // Example: Display a list of vehicle classifications
//   const classifications = getClassificationsFromDatabase();
//   res.render('classification_list', { classifications: classifications });
// });


module.exports = router




