const database = require('../../database')

module.exports = {
    getVehicleDetail: async function(vehicleId) {
    const vehicleData = await database.get(vehicles, vehicleId)
    if(!vehicleData) {
    throw new Error("Vehicle not found")}
    return vehicleData;
    }
    };