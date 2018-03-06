var mysql = require('mysql'),
    db    = require('../dbconnection');

/** Inmuebles' methods **/
const tableName = "inmuebles_photos";
const InmueblesPhotos = {
  /**
   * upsert() method
   * Insert or Update a record
   */
  upsert: function(inmuebleId, type, data, callback) {
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var params = [tableName, "inmueble_id", inmuebleId, "type", type];
    query = mysql.format(query, params);

    return db.query(query, function (err, res) {

      if (res.length) { // Update record
        var query = "UPDATE ?? SET name = ?, obs = ? WHERE ??=? AND ??=?";
        params = [tableName, data.pic, data.obs, "inmueble_id", inmuebleId, "type", type];
      } else { // Insert
        var query = "INSERT INTO ?? (inmueble_id, type, name, obs) VALUES (?, ?, ?, ?)";
        params = [tableName, inmuebleId, type, data.pic, data.obs];
      }

      query = mysql.format(query, params);
      return db.query(query, callback);
    });
  }
};

module.exports = InmueblesPhotos;
