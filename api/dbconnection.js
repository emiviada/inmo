var mysql = require('mysql');

// Database connection
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'inmo',
  password : 'eE6Ji0Lj',
  database : 'inmo'
});

module.exports = connection;
