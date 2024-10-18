const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.getInventoryDetail = async (req, res, next) => {
  let invId = req.params.id
let invData = await invModel.getInventoryDetail(inv_Id)
  if(invData){
    res.status(200).render('./inventory/detail', {
      inv: invData
    })
  } else {
    res.status(404).render('error')
  }
}

module.exports = invCont