// Security controller
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const UserTokens = require('../models/userTokens');

const login = function(req, res) {
  Users.getByEmail(req.body.email, function(err, rows) {
    if (err) {
      res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
      if (rows.length) {
        // Generate user_token
        var user = rows[0];
        // Check password
        let valid = bcrypt.compareSync(req.body.password, user.password);
        if (valid) {
          delete user.password;
          UserTokens.create(user, function(err, row) {
              res.json({"error": false, "message": "Success", "data": row});
          });
        } else {
          res.status(400).json({"error": true, "message": "Invalid password"});
        }
      } else {
        res.status(404).json({"error": true, "message": "Not Found"});
      }
    }
  });
}
module.exports.login = login;

const logout = function (req, res) {
  let token = req.get('Authorization').replace('Bearer ', '');
  UserTokens.delete(token, function(err, result) {
    if (err) {
      res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
      res.json({"error": false, "message": "Logged out."});
    }
  });
}
module.exports.logout = logout;
