// Users controller
const Users = require('../models/users');
const ValidationError = require('../errors/index');

const getAll = function(req, res) {
  Users.getAll(function(err, rows) {
    if (err) {
        res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
        res.json({"error": false, "message": "Success", "data" : rows});
    }
  });
}
module.exports.getAll = getAll;

const getOne = function(req, res) {
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
}
module.exports.getOne = getOne;

const create = function(req, res) {
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
}
module.exports.create = create;

const update = function(req, res) {
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
}
module.exports.update = update;

const remove = function(req, res) {
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
}
module.exports.remove = remove;
