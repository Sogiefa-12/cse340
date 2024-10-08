// utils/index.js
const express = require('express')
const navigation = {
    Home: '/',
    Custom: '/',
    Sedan: '/',
    SUV: '/',
    Truck: '/'
  };

  /****************************
  * Middleware For Handling Errors
  * Wrap other function in this for 
  * General Error Handling
 **************************************** */
  const utilities = {
    getNav: function () {
    return navigation;
    },
    handleErrors: fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
    };
    module.exports = utilities;
//  {
//     getNav: function () {
//       return navigation;
//     },
// };
