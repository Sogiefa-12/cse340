const Sequelize = require('sequelize')
// const db = require('../../config/config')

const db = new Sequelize({
    dialect: 'postgres',
    host: 'dpg-crt9o6d6l47c73d8omdg-a.oregon-postgres.render.com',
    port: 5432,
    username: 'postgres',
    password: 'Hw2fbkG0CYPI35e76DrifqpsAcVMzZXj',
    database: 'cse340',
    // other Sequelize options here
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