/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const session = require("express-session");
const expressLayouts =
require("express-ejs-layouts")
const env = require("dotenv").config()
const baseController = require("./controllers/baseController")
const invController = require("./controllers/invController")
const pool = require('./database/');
const app = express()
const static = require("./routes/static")
const utilities = require("./utilities/")
const path = require("path")
const inventoryRoute = require("./routes/inventoryRoute")


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", path.join(__dirname, "views", "layouts", "layout.ejs"))

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
app.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)
// Home page route
app.get("/", async (req, res) => {
  try {
    res.render("index", {title: "Home"})
  } catch (err) {
    res.render("errors/error", {err: err, message: err.message});
  }
});


app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})



/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities
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