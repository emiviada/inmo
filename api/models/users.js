var mysql = require('mysql'),
    db    = require('../dbconnection'),
    Utils = require('../utils'),
    ValidationError = require('../errors/index'),
    selectQuery = "SELECT id, first_name, last_name, email, role FROM ??";

/** Users' methods **/
const tableName = "users";
const Users = {
  getAll: function(callback) {
    var query = selectQuery;
    var table = [tableName];
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  getById: function(id, callback) {
    var query = `${selectQuery} WHERE id = ?`;
    var params = [tableName, id];
    query = mysql.format(query, params);

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
  },

  createProfile: function(userId, callback) {
    var query = "INSERT INTO ?? (user_id) VALUES (?)",
        table = ["user_profile", userId];
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  getProfile: function(callback) {
    var query = "SELECT address, phone, web, facebook, instagram, twitter from ?? WHERE ?? = ?";
    var table = ["user_profile", "user_id", user.id];
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  updateProfile: function(data, callback) {
    var query = "UPDATE ?? SET ",
        table = ["user_profile"];

    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        query += "?? = ?, ";
        table.push(prop, data[prop]);
      }
    }
    query = query.substr(0, query.length-2);
    query += " WHERE ?? = ?";
    table.push("user_id", user.id);
    query = mysql.format(query, table);

    return db.query(query, callback);
  },

  getByEmail: function(email, callback) {
    var query = `${selectQuery.replace(', role', ', role, password')} WHERE email = ?`,
        params = [tableName, email];
    query = mysql.format(query, params);

    return db.query(query, callback);
  },

  getByToken: function(token, callback) {
    let query = 'SELECT u.* FROM ?? AS u LEFT JOIN ?? AS t ON t.user_id = u.id WHERE t.token = ?;',
        params = [tableName, 'user_token', token];
    query = mysql.format(query, params);

    return db.query(query, callback);
  }
};

// Validate data
function validate(mode, data) {
  let allowed = ['email', 'role', 'password', 'first_name', 'last_name'],
    required = ['email', 'role'];

  // First check allowed fields
  for (var prop in data) {
    if (allowed.indexOf(prop) === -1) {
      throw new ValidationError('Field "' + prop + '" is not allowed.');
    }
  }

  if (mode === 'create') {
    required.push('password')
  }

  // Check required fields
  for (var i in required) {
    if (Object.keys(data).indexOf(required[i]) === -1) {
      throw new ValidationError('Field "' + required[i] + '" is required.');
    }
  }

  return true;
};

module.exports = Users;
