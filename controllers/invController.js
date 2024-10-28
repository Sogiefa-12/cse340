const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// const getVehicleDetail = require('../models/inventory-model');

const invCont = {}
/* ***************************
 *  Build inventory by classification view
 * ************************** */

invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;

    // Fetch the list of vehicles from the database using the invModel.getAllVehicles() method
    const vehicles = await invModel.getVehiclesByType();
    
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
      vehicles,
    });
  } catch (err) {
    console.error("Error in buildByClassificationId:", err.message);
    return next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
  }
};

invCont.getVehicleDetail = async (req, res, next) => {
  try {
    // Fetch the vehicle ID from the query parameter
    const inventoryId = req.params.id;
    let nav = await utilities.getNav();
    const vehicleDetail = await invModel.getVehicleDetail(inventoryId);
    // console.log(vehicleDetail);
    res.render("./inventory/detail", { vehicleDetail, title: `${vehicleDetail.inv_make} ${vehicleDetail.inv_model}`, nav });
  } catch (err) {
    console.error("Error in getVehicleDetail:", err.message);
    return next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
  }
};


// Render the management view
invCont.management = async(req, res) => {
  let nav = await utilities.getNav();
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    messages: "",
    errors: {},
    flash: req.flash()
  });
};


// Add classification
invCont.addClassification = async (req, res, next) => {
  let nav = await utilities.getNav();
  const errors = {};

  try {
    // Validate the classification name
    const { classification_name } = req.body;

    // Insert the classification into the database
    const classification = {
      classification_name,
    };

    const result = await invModel.addClassification(classification);

    // If the classification was successfully added, update the navigation bar and redirect to the management view
    if (result) {
      await utilities.updateNav(classification);
      res.redirect("/inventory/management");
    } else {
      // If the classification was not added successfully, render the error message
      errors.classification_name = "An error occurred while adding the classification. Please try again.";
      return res.render("./inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav
      });
    }
  } catch (error) {
    next(error);
  }
};


invCont.addInventoryItem = async (req, res, next) => {
  let nav = await utilities.getNav();
  const errors = {};

  try {
    // Validate the inventory item details
    const {
      inv_classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_price,
      inv_color,
      inv_miles,
      inv_id,
      inv_description
    } = req.body;

    if (!inv_classification_id) {
      errors.inv_classification_id = "Classification is required.";
    }
    if (!inv_make) {
      errors.inv_make = "Make is required.";
    }

    if (!inv_model) {
      errors.inv_model = "Model is required.";
    }
    if (typeof inv_year !== "number") {
      errors.inv_year = "Year must be a number.";
    }
    if (typeof inv_price !== "number") {
      errors.inv_price = "Price must be a number.";
    }
    if (!inv_color) {
      errors.inv_color = "Primary color is required.";
    }
    if (typeof inv_miles !== "number") {
      errors.inv_miles = "Mileage must be a number.";
    } else if (inv_miles <= 0) {
      errors.inv_miles = "Mileage must be greater than 0.";
    }
    if (inv_id) {
      errors.inv_id = "Vehicle ID cannot be set.";
    }
    if (!inv_description) {
      errors.inv_description = "Brief description is required.";
    }

    if (Object.keys(errors).length > 0) {
      // If there are any errors, render the form again with error messages
      return res.render("./inventory/add-inventory-items", {
        errors,
        title: "Add Inventory Item",
        nav
      });
    }

    // Insert the inventory item into the database
    const inventory_item = {
      inv_classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_price,
      inv_color,
      inv_miles,
      inv_id,
      inv_description
    };

    const result = await invModel.addInventoryItem(inventory_item);

    if (result) {
      // If the inventory item was added successfully, update the navigation bar
      await utilities.updateNav();
      // Render the management view
      res.status(200).render("./inventory/management", {
        title: "Inventory Management",
        messages: "Inventory item added successfully",
        nav
      });
    } else {
            // If the inventory item was not added successfully, render the error message
            res.render("./inventory/add-inventory-items", {
            errors: { message: "Failed to add inventory item. Please try again." },
            title: "Add Inventory Item",
            nav
            });
            }
    } catch (error) {
      // If an unexpected error occurs, pass it to the error handler middleware
        next(error);
    }
  };

  module.exports = invCont
