// Inmuebles Controller
const Inmuebles = require('../models/inmuebles');
const ValidationError = require('../errors/index');

const getAll = function(req, res) {
  Inmuebles.getAll(function(err, rows) {
    if (err) {
        res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
        if (rows.length) {
          rows.forEach(function(row, i) {
            rows[i].pics = getInmueblePhotos(row);
          });
        }
        res.json({"error": false, "message": "Success", "data" : rows});
    }
  });
}
module.exports.getAll = getAll;

const getOne = function(req, res) {
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
}
module.exports.getOne = getOne;

const create = function(req, res) {
  Inmuebles.create(req.body, function(err, result) {
    if (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({"error": true, "message": err.message});
      } else {
        res.status(500).json({"error": true, "message": "Error executing MySQL query"});
      }
    } else {
      let locationUrl = '/api/inmuebles/' + result.insertId;
      res.set('Location', locationUrl);
      res.json({"error": false, "message": "Inmueble created."});
    }
  });
}
module.exports.create = create;

const update = function(req, res) {
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
}
module.exports.update = update;

const remove = function(req, res) {
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
}
module.exports.remove = remove;
