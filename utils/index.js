// utils/index.js
const { Sequelize } = require("sequelize")
const express = require('express')
const app = express();
const router = express.Router()
const database = require('../models/database/vehicleModel')

const navigation = {
    Home: '/',
    Custom: '/',
    Sedan: '/',
    SUV: '/',
    Truck: '/',
    ErrorTrigger: '/generate-error'
  };
  

  /****************************
  * Middleware For Handling Errors
  * Wrap other function in this for 
  * General Error Handling
 **************************************** */
 //Middleware for footer-based error
 app.get('/generate-error', function(req,res){
  res.status(500).send('Error generated');
 });

module.exports = {
  getNav: function () {
    return navigation;
  },
  handleErrors: (err, req, res, next) => {
    console.error(`Error at: "${req.originalUrl}": ${err.message}`);
    if (err.status == 404) {
      message = err.message;
    } else {
      message = "Oh no! There was a crash. Maybe try a different route?";
    }
    const nav = utils.buildNav();
    res.render("errors/error", {
      title: err.status || "Server Error",
      message,
      nav
    });
  },
  getVehicleDetail: async function(vehicleId) {
    const vehicleData = await database.get(vehicles, vehicleId);
    if(!vehicleData){
      throw new Error("Vehicle not found");
    }
    return vehicleData;
  },
  getVehicleCount: function() {
    return database.count(vehicles);
  },
  router
};