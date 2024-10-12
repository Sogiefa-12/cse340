const express = require("express");

module.exports = {
  generateError: async (req, res, next) => {
    res.status(500).render("error", {
      title: "Server Error",
      message: "Oops, something went wrong! Please try again later."
    });
},
}