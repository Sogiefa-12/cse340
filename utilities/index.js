const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* ****************************************
 * Update the navigation bar with the newly added classification
 * **************************************** */
Util.updateNav = async function (currentNavigation, classification) {
  // Add the new classification to the navigation items
  const newItem = {
    title: classification.classification_name,
    url: `/inventory/classification/${classification.classification_id}`
  };
  currentNavigation.items.push(newItem);

  // Return the updated navigation object
  return currentNavigation;
};


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

    /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */

// This function handles errors from the wrapped function.
Util.handleErrors = fn => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

Util.formatVehicleDetail = (vehicleDetail) => {
  const price = vehicleDetail.inv_price
    ? new Intl.NumberFormat('en-US').format(vehicleDetail.inv_price)
    : '';

  const miles = vehicleDetail.inv_miles
    ? vehicleDetail.inv_miles.toLocaleString('en-US')
    : '';

  return `
    <h1>${vehicleDetail.inv_make} ${vehicleDetail.inv_model}</h1>
    <div><img src="${vehicleDetail.inv_image}" alt="${vehicleDetail.inv_make} ${vehicleDetail.inv_model}" /></div>
    <div>
      <p>Make: ${vehicleDetail.inv_make}</p>
      <p>Model: ${vehicleDetail.inv_model}</p>
      <p>Year: ${vehicleDetail.inv_year}</p>
      <p>Price: $${price}</p>
      <p>Mileage: ${miles}</p>
      <p>Description: ${vehicleDetail.inv_description}</p>
    </div>
  `;
};

module.exports = Util