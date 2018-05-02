// Security controller
const Users = require('../models/users');
const UserTokens = require('../models/userTokens');

const login = function(req, res) {
  Users.checkLogin(req.body, function(err, rows) {
    if (err) {
      res.status(500).json({"error": true, "message": "Error executing MySQL query"});
    } else {
      if (rows.length) {
        // Generate user_token
        var user = rows[0];
        UserTokens.create(user, function(err, row) {
            res.json({"error": false, "message": "Success", "data": row});
        });
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
