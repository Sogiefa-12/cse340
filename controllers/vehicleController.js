// controllers/vehicleController.js file

const VehicleModel = require('../models/database/vehicleModel')
const express = require("express");
const Vehicle = require("../models/vehicle");
const router = express.Router();

// Vehicle Method
exports.all = () => {
    return VehicleModel.find()
        .then((vehicles) =>{
            return vehicles;
        })
        .catch((err) => {
            throw err;
        });
    }
    // Sedan Method
    exports.sedan = (req, res) => {
        return VehicleModel.find({
            where: {
            type: 'sedan'
            }
            })
            .then((vehicles) =>{
                return vehicles;
            })
            .catch((err) => {
                throw err;
            });
            }
            // SUV Method
    exports.suv = (req, res) => {
        return VehicleModel.find({
            where: {
                type: 'suv'
                }
                })
                .then((vehicles) =>{
                    return vehicles;
                })
                .catch((err) => {
                    throw err;
                })
            }
    // Truck Method
    exports.truck = (req, res) => {
        return VehicleModel.find({
            where: {
                type: 'truck'
            }
            })
            .then((vehicles)=> {
                return vehicles;
            })
            .catch((err) => {
                throw err
            });
        }
    // Delete Vehicle Function
    exports.delete = (id, req, res) => {
        VehicleModel.findByIdAndDelete(id)
        .then((vehicle) => {
            return res.status(200).json({
                message: `Vehicle ${id} deleted successfully`
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message:` Error deleting Vehicle ${id}: ${err.message}`
            });
        })
    } 
    
    
router.get("/", (req, res) => {
Vehicle.find((error, vehicles) => {
    if (error) {
        return res.status(500).json({
            message: "Error retrieving vehicles!"
        });
    } else {
        return res.status(200).json(vehicles);
    }
    });
});
router.get("/:id", (req, res) => {
    Vehicle.findById(req.params.id, (error, vehicle) => {
        if (error) {
            return res.status(500).json({
                message: "Error retrieving vehicle!"
            });
        } else {
            return res.status(200).json(vehicle);
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
        return res.status(400).json({
            message: "Vehicle with this name already exists!"
        });
        } else {
            return res.status(500).json({
                message: "Error creating vehicle!"
            });
        }
});
})
module.exports = router;

