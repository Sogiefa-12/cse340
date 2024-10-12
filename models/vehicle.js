const VehicleModel = require('../models/database/vehicleModel')

exports.find = async () => {
  return await VehicleModel.find()
}

exports.findByIdAndDelete = async (id) => {
  return await VehicleModel.findByIdAndDelete(id)
}


// Vehicle.create
exports.create = async ({ name, year, type, price, picture, description }) => {
    return await VehicleModel.create({
      name,
      year,
      type,
      price,
      picture,
      description
    })
}

