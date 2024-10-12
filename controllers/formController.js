const {getConnection} = require('../utils/index')
const {newVehicle} = require('../models/database/vehicleModel')

const vehiclesUpdate = async (req, res, next) => {
    
try {
    const {
      name, year, make, model, vin, price, description
    } = req.body
const conn = await getConnection()
    await newVehicle.create(conn, {
      name, year, make, model, vin, price, description
    })
    await conn.commit()
    res.redirect("/vehicles")
  } catch (err) {
    console.log(err)
    next(err)
    }
}

module.exports = {
vehiclesUpdate
}
