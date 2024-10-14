// database/vehicleModel.js File
//const Sequelize = require('sequelize');
//const config = require('../../config/config');
//const db = new Sequelize(config);

// Initialize sequelize object
db = new Sequelize({
    dialect: "postgres", // or "mysql", "sqlite", etc.
    // other options here...
  });

const Vehicle = db.define('vehicle', {
    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    make: {
        type: Sequelize.STRING,
        allowNull: false
        
        },
    model: {
        type: Sequelize.STRING,
        allowNull: false
        },
    vin: {
        type: Sequelize.STRING,
        allowNull: false
        },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    
        },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
        },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
        },
    type: {
        type: Sequelize.STRING,
        allowNull: false
        }
        })

module.exports = Vehicle