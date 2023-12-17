"use strict";

var mysql = require('mysql2');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_complete',
  password: ''
});
module.exports = pool.promise();