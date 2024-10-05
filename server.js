/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts =
require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const utilities = require("./utils/index")
const path = require("path");



/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
// app.set("layout", "./layouts/layout") // not at views root
app.set("layout", path.join(__dirname, "views", "layouts", "layout.ejs"));

// app.set("views", path.join(__dirname, "."));

const title = 'CSE 340 App'
app.use((req, res, next) => {
  res.locals.title = title
  next()
})
/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})

// File Not found Route - must be last route
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  const errType = typeof err.message
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    err:err,
    message: err.message,
    nav
  })
})


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})



