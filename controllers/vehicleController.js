const VehicleModel = require('../models/database/vehicleModel')
const express = require("express");
const Vehicle = require("../models/vehicle");
const router = express.Router();

// Vehicle Method
exports.all = () => {
    return VehicleModel.find()
    }
    // Sedan Method
    exports.sedan = () => {
        return VehicleModel.find({
            where: {
            type: 'sedan'
            }
            })
            }
            // SUV Method
            exports.suv = () => {
            return VehicleModel.find({
                where: {
                    type: 'suv'
                    }
                    })
                    }
                    // Truck Method
                    exports.truck = () => {
                    return VehicleModel.find({
                    where: {
                    type: 'truck'
                    }
                    })
                    }
                    // Delete Vehicle Function
                    exports.delete = (id) => {
                    return VehicleModel.findByIdAndDelete(id)
                    .then(() => {
                    return {message: `Vehicle ${id} deleted successfully`}
    })
    .catch((err) => {
        return {message:` Error deleting Vehicle ${id}: ${err.message}`}
        })
    }
    
router.get("/", (req, res) => {
Vehicle.find((error, vehicles) => {
    if (error) {
        res.status(500).send("Error retrieving vehicles!");
    } else {
    res.render("index", { vehicles });
    }
    });
});
router.get("/:id", (req, res) => {
    Vehicle.findById(req.params.id, (error, vehicle) => {
    if (error) {
    res.status(500).send("Error retrieving vehicle!");
} else {
    res.render("view", { vehicle });
}
});
});
router.post("/", (req, res) => {
const { name, year, type, price, picture, description } = req.body;
const newVehicle = new Vehicle({
name,
year,
type,
price,
picture,
description
});
newVehicle.save((error) => {
    if (error.name === "ValidationError") {
        res.status(400).send("Vehicle with this name already exists!");
        } else {
            res.status(500).send("Error creating vehicle!");
}
});
})
module.exports = router;

