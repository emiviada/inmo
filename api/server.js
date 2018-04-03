// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var cors       = require('cors');
var bodyParser = require('body-parser');

var ValidationError = require('./errors/index');
var Users  = require('./models/users');
var Inmuebles  = require('./models/inmuebles');
var InmueblesPhotos  = require('./models/inmueblesPhotos');


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
var router = express.Router();              // get an instance of the express Router

// Middleware to use for all requests
router.use(function(req, res, next) {
  // TODO: do logging
  var error = false;

  // Check if Content-Type header is properly setup
  if (req.get('Content-Type').indexOf('application/json') < 0) {
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

// test route to make sure everything is working (accessed at GET http://localhost:PORT/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// ------------------- USERS ----------------------
// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

  // get all the users (accessed at GET /api/users)
  .get(function(req, res) {
    Users.getAll(function(err, rows) {
      if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
      } else {
          res.json({"error": false, "message": "Success", "data" : rows});
      }
    });
  })

  // Create an user (accessed at POST /api/users)
  .post(function(req, res) {

    Users.create(req.body, function(err, result) {
      if (err) {
        if (err instanceof ValidationError) {
          res.status(400).json({"error": true, "message": err.message});
        } else {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        }
      } else {
        var locationUrl = '/api/users/' + result.insertId;
        res.set('Location', locationUrl);
        res.json({"error": false, "message": "User created."});
      }
    });
  });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

    // GET the user with that id (accessed at GET /api/users/:user_id)
    .get(function(req, res) {
      Users.getById(req.params.user_id, function(err, rows) {
        if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        } else {
          if (rows.length) {
            var row = rows[0];
            res.json({"error": false, "message": "Success", "data": row});
          } else {
            res.status(404).json({"error": true, "message": "Not Found"});
          }
        }
      });
    })

    // PUT (Update) the user with that id (accessed at PUT /api/users/:user_id)
    .put(function(req, res) {
      Users.getById(req.params.user_id, function(err, rows) {
        if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        } else {
          if (rows.length) {
            if (Object.keys(req.body).length == 0) {
              res.status(400).json({"error": true, "message": "Bad request: No fields to update"});
            } else {
              delete req.body.id;
              Users.update(req.params.user_id, req.body, function(err, result) {
                if (err) {
                  if (err instanceof ValidationError) {
                    res.status(400).json({"error": true, "message": err.message});
                  } else {
                    res.status(500).json({"error": true, "message": "Error executing MySQL query"});
                  }
                } else {
                  res.json({"error": false, "message": "User updated."});
                }
              });
            }
          } else {
            res.status(404).json({"error": true, "message": "Not Found"});
          }
        }
      });
    })

    // Delete the user with that id (accessed at DELETE /api/users/:user_id)
    .delete(function(req, res) {
      Users.getById(req.params.user_id, function(err, rows) {
        if (err) {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        } else {
          if (rows.length) {
            Users.delete(req.params.user_id, function(err, result) {
              if (err) {
                res.status(500).json({"error": true, "message": "Error executing MySQL query"});
              } else {
                res.json({"error": false, "message": "User deleted."});
              }
            });
          } else {
            res.status(404).json({"error": true, "message": "Not Found"});
          }
        }
      });
    });

// ------------------- INMUEBLES ----------------------
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

    Inmuebles.create(req.body, function(err, result) {
      if (err) {
        if (err instanceof ValidationError) {
          res.status(400).json({"error": true, "message": err.message});
        } else {
          res.status(500).json({"error": true, "message": "Error executing MySQL query"});
        }
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
            var row = rows[0];
            row.pics = getInmueblePhotos(row);
            res.json({"error": false, "message": "Success", "data": row});
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

              // Process Inmueble Photos first
              try {
                var body = processInmueblePhotos(req.params.inmueble_id, req.body);
              } catch (err) {
                res.status(500).json({"error": true, "message": "Error processing photos"});
              }

              Inmuebles.update(req.params.inmueble_id, body, function(err, result) {
                if (err) {
                  if (err instanceof ValidationError) {
                    res.status(400).json({"error": true, "message": err.message});
                  } else {
                    res.status(500).json({"error": true, "message": "Error executing MySQL query"});
                  }
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

// HELPER FUNCTIONS
var housePics = ['front', 'hall', 'bedroom', 'badroom', 'kitchen', 'kitcken_diningroom', 'diningroom',
  'living', 'sink', 'tender', 'gallery', 'grill', 'gazebo', 'patio', 'hallway', 'garage'];
// =============================================================================
var processInmueblePhotos = function (inmuebleId, body) {

  housePics.forEach(function (property) {
    if (body.pics.hasOwnProperty(property) && body.pics[property].changed) {
      InmueblesPhotos.upsert(inmuebleId, property, body.pics[property]);
    }
  });
  delete body.pics;

  return body;
}

var getInmueblePhotos = function (row) {
  var emptyPic = {pic: null, obs: null};
  var pics = {};
  housePics.forEach(function (prop) {
    pics[prop] = emptyPic;
  });
  var picsToProcess = row.pics.split(',');

  picsToProcess.forEach(function(val) {
    var fields = val.split('|');
    var type = fields[0].split(':')[1];
    pics[type] = {
      pic: fields[1].split(':')[1],
      obs: fields[2].split(':')[1]
    };
  });

  return pics;
}

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Inmo API listening on port ' + port);
