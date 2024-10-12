const express = require('express')
const router = express.Router()

//GET vehicles
router.get('/vehicles', (req, res) => {
  //retrieve all vehicles from the database
Vehicle.findAll().then(vehicles => {
    
    res.send(vehicles)
    })
    })

//GET vehicle detail
router.get('/vehicle/:id', (req, res) => {
const id = req.params.id
Vehicle.findByPk(id).then(vehicle => {
    
    res.send(vehicle)
    })
    })

//POST new vehicle
router.post('/vehicle', (req, res) => {
const newVehicle = req.body
    Vehicle.create(newVehicle).then(newVehicle => {
    res.send(newVehicle)
  })
})

module.exports = router
