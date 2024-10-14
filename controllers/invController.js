const invModel = require("../models/database/invModel")
const utilities = require("../utils/utilities")
const invValidate = require("../utils/inventory-validation")
invCont.buildByVehicleId = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getVehicleByInvId(inv_id)
    const vehicleView = await utilities.buildVehicleView(data)
let nav = await utilities.getNav()
res.render("./inventory/vehicle", {
title: data.inv_make + " " + data.inv_model,
nav,
vehicleView,
errors: null
})
};

// Vehicle search and filtering route
router.get("/inventory/vehicle", async (req, res) => {
    const searchQuery = req.query.searchQuery
    const year = req.query.year
    const make = req.query.make
    const model = req.query.model
    const type = req.query.type
    const price = req.query.price
    const availability = req.query.availability
    const query = {}
    if (searchQuery) query.searchQuery = searchQuery
    if (year) query.year = year
    if (make) query.make = make
    if (model) query.model = model
    if (type) query.type = type
    if (price) query.price = price
    if (availability) query.availability = availability
    const vehicles = await invModel.find(query)
    const vehicleView = await utilities.buildVehicleView(vehicles)
    res.render("vehicle", { vehicleView })
});


// Add new inventory
const addNewInventory = async (req, res) => {
    const body = req.body;
    const errors = await invValidate.validateNewInventory(body);
    if (errors) {
        return res.status(400).json(errors);
        }
        // Validation successful, create new inventory
        const inventory = await vehicle.create(body);
        res.json(inventory);
 };

