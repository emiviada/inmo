var mysql = require('mysql'),
    db    = require('../dbconnection'),
    Utils = require('../utils');

/** Inmuebles' methods **/
const tableName = "inmuebles";
const Inmuebles = {
  getAll: function(callback) {
    var query = "SELECT * FROM ??";
    var table = [tableName];
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  getById: function(id, callback) {
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = [tableName, "id", id];
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  create: function (data, callback) {
    var query = "INSERT INTO ?? (",
        valuesString = "",
        values = [],
        table = [tableName];
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        query += "??,";
        valuesString += "?,";
        values.push(data[prop]);
        table.push(prop);
      }
    }
    valuesString = valuesString.substr(0, valuesString.length-1);
    query = query.substr(0, query.length-1) + ", created_at, updated_at) VALUES (" +
      valuesString + ",?,?)";
    for (var i in values) {
      table.push(values[i]);
    }
    nowUtc = Utils.getUtcDatetime();
    table.push(nowUtc, nowUtc);
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  update: function(id, data, callback) {
    var query = "UPDATE ?? SET ",
        table = [tableName];
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        query += "?? = ?, ";
        table.push(prop, data[prop]);
      }
    }
    query = query.substr(0, query.length-2);
    query += ", ?? = ? WHERE ?? = ?";
    nowUtc = Utils.getUtcDatetime();
    table.push("updated_at", nowUtc, "id", id);
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  delete: function(id, callback) {
    var query = "DELETE FROM ?? WHERE ?? = ?",
        table = [tableName, "id", id];
    query = mysql.format(query, table);

    return db.query(query, callback);
  }
};

module.exports = Inmuebles;
