// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors       = require('cors');
var bodyParser = require('body-parser');
require('./global_functions');

const AuthMiddleware = require('./middlewares/AuthMiddleware');

// Configure app to use CORS
var corsOptions = {
  exposedHeaders: 'location'
}
app.use(cors(corsOptions));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8181;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const v1 = require('./routes/v1');

// Authentication Middleware
app.use(AuthMiddleware.auth);
// Middleware to use for all requests (TODO: Move it to its own file)
app.use(function(req, res, next) {
  // TODO: do logging
  let error = false;

  // Check if Content-Type header is properly setup
  if (!req.get('Content-Type') && req.get('Content-Type').indexOf('application/json') < 0) {
    error = true;
    res.status(400).json({"error": true, "message": "Content-Type header is not properly setup."});
  }

  // In POST/PUT requests, check that dara was provided
  if (req.method === 'POST' || req.method === 'PUT') {
    if (Object.keys(req.body).length === 0) {
       error = true;
       res.status(400).json({"error": true, "message": "Data should be provided."});
    }
  }

  if (!error) {
    next(); // make sure we go to the next routes and don't stop here
  }
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', v1);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Inmo API listening on port ' + port);
