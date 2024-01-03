"use strict";

//#region Sequelize database setup and connection
// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('node_complete', 'root', '', { dialect: 'mysql', host: 'localhost' });
// module.exports = sequelize;
//#endregion
//#region Database SQL setup  AKA DB context
// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: ''
// });
// module.exports = pool.promise();
//#endregion
//#region Mongodb database setup
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var _db;

var mongoConnect = function mongoConnect(cb) {
  MongoClient.connect('mongodb://localhost:27017', {
    family: 4
  }).then(function (client) {
    _db = client.db('Shop');
    cb();
  })["catch"](function (err) {
    console.log(err);
    throw err;
  });
};

var getDb = function getDb() {
  if (_db) {
    return _db;
  }

  throw 'No db found';
}; //#endregion


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;