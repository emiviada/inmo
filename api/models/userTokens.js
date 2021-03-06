var mysql = require('mysql'),
    db    = require('../dbconnection'),
    Utils = require('../utils');

/** UserTokens' methods **/
const tableName = "user_token";
const UserTokens = {
  create: function (user, callback) {

    let token = Utils.randomHash(32);
    let nowUtc = Utils.getUtcDatetime();

    let query = "INSERT INTO ?? (token, user_id, expiration_date, updated_at, created_at) VALUES (?, ?, DATE_ADD(?, INTERVAL 2 HOUR), ?, ?)",
        table = [tableName, token, user.id, nowUtc, nowUtc, nowUtc];
    query = mysql.format(query, table);

    try {
      db.query(query);
      user.token = token;
      return callback(null, user);
    } catch (err) {
      return callback(err);
    }
  },

  getByToken: function(token, callback) {
    var query = 'SELECT * FROM ?? WHERE token = ?';
    var params = [tableName, token];
    query = mysql.format(query, params);

    return db.query(query, callback);
  },

  delete: function(token, callback) {
    var query = "DELETE FROM ?? WHERE ?? = ?",
        table = [tableName, "token", token];
    query = mysql.format(query, table);

    return db.query(query, callback);
  }
};

module.exports = UserTokens;
