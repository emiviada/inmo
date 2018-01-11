var mysql = require('mysql');

// Database connection
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'inmo',
  password : 'inmo',
  database : 'inmo'
});

module.exports = connection;
