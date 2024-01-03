
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
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (cb) => {
    MongoClient.connect('mongodb://localhost:27017', { family: 4 })
        .then(client => {
            _db = client.db('Shop');
            cb()
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No db found'
}
//#endregion

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;