// Load modules
const express = require('express');
const router = express.Router();
const { query, save } = require('../models/database/invModel');
// GET home page
router.get('/', (req, res) => {
res.render('index');
});
// GET vehicle list
router.get('/vehicles', (req, res) => {
query()
.then(vehicles => {
    res.render('vehicles', {
        title: 'Vehicles',
        vehicles
        });
        })
        .catch(err => {
        res.status(500).send(err);
        });
});
// GET vehicle details
router.get('/vehicle/:id', (req, res) => {
    query(req.params.id)
    .then(vehicle => {
        if (!vehicle) {
        res.status(404).send('Vehicle not found');
        } else {
        res.render('vehicle', {
        title:` ${vehicle.name} Details, ${vehicle}`

         })
    }
    })
    .catch(err => {
        res.status(500).send(err);
    });
});
    
// GET 404 page
router.get('*', (req, res) => {
    res.status(404).render('404');
    });
    // POST to save vehicle
    router.post('/vehicles', (req, res) => {
    const vehicle = {  
        ...req.body.vehicle,
        year: req.body.vehicle.year
        };
        save(vehicle)
        .then(savedVehicle => {
            res.redirect('/vehicles');
        })
    .catch(err => {
        res.status(500).send(err);
    });
});  

// GET search and filter vehicles
router.get('/inventory/vehicle', (req, res) => {
    const params = {
        searchQuery: req.query.searchQuery,
        priceMin: req.query.priceMin,
        priceMax: req.query.priceMax
        };
        query(params)
        .then(vehicles => {
        res.render('index', {
        title: 'Search Results',
        vehicles
    })
})
.catch(err => {
res.status(500).send(err);
});
});
module.exports = router;