var mysql = require('mysql'),
    db    = require('../dbconnection'),
    Utils = require('../utils'),
    ValidationError = require('../errors/index');

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

    try {
      validate('create', data);
    } catch (err) {
      return callback(err);
    }

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

    try {
      validate('update', data);
    } catch (err) {
      return callback(err);
    }

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

// Validate data
function validate(mode, data) {
  let allowed = ['type', 'street', 'neighborhood', 'city', 'state', 'area_front', 'area_back',
    'area_built'],
    required = ['type'];

  // First check allowed fields
  for (var prop in data) {
    if (allowed.indexOf(prop) === -1) {
      throw new ValidationError('Field "' + prop + '" is not allowed.');
    }
  }

  // Check required fields
  for (var i in required) {
    if (Object.keys(data).indexOf(required[i]) === -1) {
      throw new ValidationError('Field "' + required[i] + '" is required.');
    }
  }

  return true;
};

module.exports = Inmuebles;
