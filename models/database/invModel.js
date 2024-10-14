const Sequelize = require("sequelize");
const config = require('../../config/config');
const db = new Sequelize(config);

// Initialize sequelize object
db = new Sequelize({
    dialect: "postgres" 
  });
const Vehicle = db.define("Vehicle", {
inv_id: {
    type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
        },
    inv_make: {
        type: DataTypes.STRING,
        allowNull: false
        },
    inv_model: {
        type: DataTypes.STRING,
        allowNull: false
        },
    inv_type: {
        type: DataTypes.STRING,
        allowNull: false
        },
    inv_price: {
        type: DataTypes.FLOAT,
        allowNull: false
        },
    inv_avail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inv_start_date: {
    type: DataTypes.DATE,
    allowNull: false
    },
    inv_end_date: {
    type: DataTypes.DATE,
    allowNull: false
    },
    inv_odometer: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        inv_address: {
        type: DataTypes.STRING,
        allowNull: false
        }
        }, {})

Vehicle.findByPk = async function (id) {
    return await Vehicle.findByPk(id)
    .then((vehicle) => {
        if (vehicle) {
        return vehicle
        } else {
        return null
        }
        })
        .catch((err) => {
        throw err
    })
}
module.exports = Vehicle