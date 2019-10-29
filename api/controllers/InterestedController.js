// Interested controller
const Interested = require('../models/interested');

const getAllMine = function (req, res) {
  let userId = null;
  if (user && user.role !== 'admin') {
    userId = user.id;
  }

  Interested.getAll(userId, function(err, rows) {
    if (err) {
        res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
        res.json({"error": false, "message": "Success", "data" : rows});
    }
  });
}
module.exports.getAllMine = getAllMine;

const getOne = function(req, res) {
  Interested.getById(req.params.interested_id, function(err, rows) {
    if (err) {
      res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
      if (rows.length) {
        var row = rows[0];

        // Check ownership
        if (req.query.edit && user && user.role !== 'admin' && row.user_id != user.id) {
          res.status(403).json({"error": true, "message": "Forbidden Access"});
        } else {
          res.json({"error": false, "message": "Success", "data": row});
        }
      } else {
        res.status(404).json({"error": true, "message": "Not Found"});
      }
    }
  });
}
module.exports.getOne = getOne;

const create = function(req, res) {
  Interested.create(req.body, function(err, result) {
    if (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({"error": true, "message": err.message});
      } else {
        res.status(500).json({"error": true, "message": "Error executing MySQL query"});
      }
    } else {
      let locationUrl = '/api/interested/' + result.insertId;
      res.set('Location', locationUrl);
      res.json({"error": false, "message": "Interested client created."});
    }
  });
}
module.exports.create = create;

const update = function(req, res) {
  Interested.getById(req.params.interested_id, function(err, rows) {
    if (err) {
      res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
      if (rows.length) {
        if (Object.keys(req.body).length == 0) {
          res.status(400).json({"error": true, "message": "Bad request: No fields to update"});
        } else {
          delete req.body.id;
          Interested.update(req.params.interested_id, req.body, function(err, result) {
            if (err) {
              if (err instanceof ValidationError) {
                res.status(400).json({"error": true, "message": err.message});
              } else {
                res.status(500).json({"error": true, "message": "Error executing MySQL query"});
              }
            } else {
              res.json({"error": false, "message": "Interested client updated."});
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
  Interested.getById(req.params.interested_id, function(err, rows) {
    if (err) {
      res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
      if (rows.length) {
        // Check ownership
        if (user && user.role !== 'admin' && rows[0].user_id != user.id) {
          res.status(403).json({"error": true, "message": "Forbidden Access"});
        } else {
          Interested.delete(req.params.interested_id, function(err, result) {
            if (err) {
              res.status(500).json({"error": true, "message": "Error executing MySQL query"});
            } else {
              res.json({"error": false, "message": "Interested client deleted."});
            }
          });
        }
      } else {
        res.status(404).json({"error": true, "message": "Not Found"});
      }
    }
  });
}
module.exports.remove = remove;
