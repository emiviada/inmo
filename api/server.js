// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var Inmuebles  = require('./models/inmuebles');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8181;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// Middleware to use for all requests
router.use(function(req, res, next) {
  // Check if Content-Type header is properly setup
  if (req.get('Content-Type') != 'application/json') {
    res.status(400).json({"error": true, "message": "Content-Type header is not properly setup."});
  }
  // TODO: do logging
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:PORT/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /inmuebles
// ----------------------------------------------------
router.route('/inmuebles')

  // get all the inmuebles (accessed at GET /api/inmuebles)
  .get(function(req, res) {
    Inmuebles.getAll(function(err, rows) {
      if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
      } else {
          res.json({"error": false, "message": "Success", "data" : rows});
      }
    });
  })

  // Create an inmueble (accessed at POST /api/inmuebles)
  .post(function(req, res) {
    // TODO: Validate required fields!!

    Inmuebles.create(req.body, function(err, result) {
      if (err) {
        res.status(500).json({"error": true, "message": "Error executing MySQL query"});
      } else {
        var locationUrl = '/api/inmuebles/' + result.insertId;
        res.set('Location', locationUrl);
        res.json({"error": false, "message": "Inmueble created."});
      }
    });
  });

// on routes that end in /inmuebles/:inmueble_id
// ----------------------------------------------------
router.route('/inmuebles/:inmueble_id')

    // GET the inmueble with that id (accessed at GET /api/inmuebles/:inmueble_id)
    .get(function(req, res) {
      Inmuebles.getById(req.params.inmueble_id, function(err, rows) {
        if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        } else {
          if (rows.length) {
            res.json({"error": false, "message": "Success", "data": rows});
          } else {
            res.status(404).json({"error": true, "message": "Not Found"});
          }
        }
      });
    })

    // PUT (Update) the inmueble with that id (accessed at PUT /api/inmuebles/:inmueble_id)
    .put(function(req, res) {
      Inmuebles.getById(req.params.inmueble_id, function(err, rows) {
        if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        } else {
          if (rows.length) {
            if (Object.keys(req.body).length == 0) {
              res.status(400).json({"error": true, "message": "Bad request: No fields to update"});
            } else {
              Inmuebles.update(req.params.inmueble_id, req.body, function(err, result) {
                if (err) {
                  res.status(500).json({"error": true, "message": "Error executing MySQL query"});
                } else {
                  res.json({"error": false, "message": "Inmueble updated."});
                }
              });
            }
          } else {
            res.status(404).json({"error": true, "message": "Not Found"});
          }
        }
      });
    })

    // Delete the inmueble with that id (accessed at DELETE /api/inmuebles/:inmueble_id)
    .delete(function(req, res) {
      Inmuebles.getById(req.params.inmueble_id, function(err, rows) {
        if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        } else {
          if (rows.length) {
            Inmuebles.delete(req.params.inmueble_id, function(err, result) {
              if (err) {
                res.status(500).json({"error": true, "message": "Error executing MySQL query"});
              } else {
                res.json({"error": false, "message": "Inmueble deleted."});
              }
            });
          } else {
            res.status(404).json({"error": true, "message": "Not Found"});
          }
        }
      });
    });

// Handle all other routes
// ----------------------------------------------------
router.all('/*', (req, res) => {
  res.status(405),
  res.json({'error': true, 'status': 405, 'message': req.method + ' not allowed on this route'})
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
