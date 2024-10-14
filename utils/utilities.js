// utilities.js file
const { handleErrors } = require(".")
const vehicle = require("../models/database/vehicleModel")
// Build vehicle view object for inventory view
utilities.buildVehicleView = async function (data) {
const makeModel = data.inv_make + " " + data.inv_model
const dateRange = utilities.getDateRange(data)
const vehicleView = {
    "make": data.inv_make,
    "model": data.inv_model,
    "type": data.inv_type,
    "price": data.inv_price,
    "availability": data.inv_avail,
    "date_range": dateRange,
    "odometer": data.inv_odometer,
    "address": data.inv_address,
    "makeModel": makeModel,
    "color": "red"
}
return vehicleView
}
const navigation = {
    Home: '/',
    Custom: '/',
    Sedan: '/',
    SUV: '/',
    Truck: '/',
    ErrorTrigger: '/generate-error'
  };
  
// Nav helpers
utilities.getNav = async function () {
    return navigation
    }
    // Route helpers
    utilities.getRoutes = function () {
    return {
    dashboard: "/dashboard",
    inventory: "/inventory",
    vehicles: "/inventory/vehicle"
    }
    }
    // Date range helpers
utilities.getDateRange = function (data) {
        const start = new Date(data.inv_start_date)
        const end = new Date(data.inv_end_date)
        const daysIn = (end - start) / (1000 * 60 * 60 * 24)
        let range = []
        for (let i = 0; i < daysIn; i++) {
        let day = new Date(start.getTime() + i * 1000 * 60 * 60 * 24)
        range.push(day)
        }
    }

// Validation helpers
utilities.validateBody = async function (body) {
    const errors = {}
    if (!body.inv_make) errors.inv_make = "Missing required field"
    if (!body.inv_model) errors.inv_model = "Missing required field"
    if (!body.inv_type) errors.inv_type = "Missing required field"
    if (!body.inv_price) errors.inv_price = "Missing required field"
    if (!body.inv_avail) errors.inv_avail = "Missing required field"
    if (!body.inv_start_date) errors.inv_start_date = "Missing required field"
    if (!body.inv_end_date) errors.inv_end_date = "Missing required field"
    return errors
}
    // Utilities handleError
utilities.handleErrors = function (err, req, res, next) {
    res.status(500).json({
    status: 500,
    error: 'Internal Server Error',
    message: err.message
    })
    const nav = getNav();
    res.render("errors/error", {
      title: err.status || "Server Error",
      message,
      nav
    });
    
    };

    
// Export the utilities object
module.exports = {
    buildVehicleView,
    getNav,
    getRoutes,
    getDateRange,
    validateBody,
    handleErrors
    }
    