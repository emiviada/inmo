// Routes
const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');
const InmueblesController = require('../controllers/InmueblesController');
const SecurityController = require('../controllers/SecurityController');
const InterestedController = require('../controllers/InterestedController');

// test route to make sure everything is working (accessed at GET http://localhost:PORT/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api v1!' });
});

// ------------------- SECURITY ----------------------
// Security routes
// ----------------------------------------------------
router.post('/login', SecurityController.login);
router.post('/logout', SecurityController.logout);

// ------------------- USERS ----------------------
// on routes that end in /users
// ----------------------------------------------------
router.route('/users')
  // get all the users (accessed at GET /api/users)
  .get(UsersController.getAll)
  // Create an user (accessed at POST /api/users)
  .post(UsersController.create);
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')
  // GET the user with that id (accessed at GET /api/users/:user_id)
  .get(UsersController.getOne)
  // PUT (Update) the user with that id (accessed at PUT /api/users/:user_id)
  .put(UsersController.update)
  // Delete the user with that id (accessed at DELETE /api/users/:user_id)
  .delete(UsersController.remove);


// ------------------- INMUEBLES ----------------------
// on routes that end in /inmuebles
// ----------------------------------------------------
router.route('/inmuebles')
  // get all the inmuebles (accessed at GET /api/inmuebles)
  .get(InmueblesController.getAll)
  // Create an inmueble (accessed at POST /api/inmuebles)
  .post(InmueblesController.create);
// To get logged in user inmubeles
router.get('/inmuebles/mine', InmueblesController.getAllMine);
// on routes that end in /inmuebles/:inmueble_id
// ----------------------------------------------------
router.route('/inmuebles/:inmueble_id')
  // GET the inmueble with that id (accessed at GET /api/inmuebles/:inmueble_id)
  .get(InmueblesController.getOne)
  // PUT (Update) the inmueble with that id (accessed at PUT /api/inmuebles/:inmueble_id)
  .put(InmueblesController.update)
  // Delete the inmueble with that id (accessed at DELETE /api/inmuebles/:inmueble_id)
  .delete(InmueblesController.remove);


// ------------------- INTERESTED ----------------------
// on routes that end in /interested
// ----------------------------------------------------
router.route('/interested')
  // get all the interested clients (accessed at GET /api/interested)
  // .get(InterestedController.getAll)
  // Create an interested client (accessed at POST /api/interested)
  .post(InterestedController.create);
// To get logged in user interested
router.get('/interested/mine', InterestedController.getAllMine);
// on routes that end in /interested/:interested_id
// ----------------------------------------------------
router.route('/interested/:interested_id')
  // GET the interested client with that id (accessed at GET /api/interested/:interested_id)
  .get(InterestedController.getOne)
  // PUT (Update) the interested client with that id (accessed at PUT /api/interested/:interested_id)
  .put(InterestedController.update)
  // Delete the interested client with that id (accessed at DELETE /api/interested/:interested_id)
  .delete(InterestedController.remove);

// Handle all other routes
// ----------------------------------------------------
router.all('/*', (req, res) => {
  res.status(405),
  res.json({'error': true, 'status': 405, 'message': req.method + ' not allowed on this route'})
});

module.exports = router;
