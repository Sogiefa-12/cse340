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
const utilities = require("./utilities/index")
const bodyParser = require("body-parser")
const path = require("path")
const inventoryRoute = require("./routes/inventoryRoute")
const accountsRoute = require("./routes/accountsRoute")
const cookieParser = require("cookie-parser")


// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


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


// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// Cookie Parser 
app.use(cookieParser())

// Create a middleware function to check if the user is logged in
app.use((req, res, next) => {
  // Check if the user is logged in (if they have a JWT in their cookies)
  if (req.cookies.jwt) {
    // Set a local variable indicating the user is logged in
    res.locals.isLoggedIn = true;
  }
  next();
});



// JWTToken
app.use(utilities.checkJWTToken)


// Create a new middleware function to check account type
app.use((req, res, next) => {
  // Check if account type is either 'Employee' or 'Admin'
  if (req.locals.accountData.accountType !== 'Employee' && req.locals.accountData.accountType !== 'Admin') {
    // On failure, redirect to login with an error message
    req.flash('error_msg', 'Unauthorized Access. Please log in with an Employee or Admin account.');
    return res.redirect('/account/login');
  }
  next();
});

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

// // Define nav variable with your navigation data
// const nav = [
//   { text: 'Home', url: '/' },
//   { text: 'Inventory', url: '/inventory' },
//   // Add more navigation items as needed
// ];

app.locals.Util = utilities;

// app.locals.nav = nav;

/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route
app.get("/", baseController.buildHome)

// app.get("/inv", invController.getInventoryDetail )



// Inventory routes
app.use("/inv", inventoryRoute)

// Account Routes
app.use("/account", accountsRoute)
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
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  try {
    const nav = await utilities
    res.status(500);
    res.render("errors/error", { err, message: err.message, nav });
  } catch (err) {
    console.error("Error in error handling middleware:", err.message);
    res.sendStatus(500);
  }
});
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