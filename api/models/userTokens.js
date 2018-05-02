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
  }
};

module.exports = UserTokens;
