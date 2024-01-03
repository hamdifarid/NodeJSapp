"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//#region Sequelize Schema Setup
// const {Sequelize} = require('sequelize')
// const sequelize = require('../utils/database');
var _require = require('mongodb'),
    ObjectId = _require.ObjectId; // const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });
//#endregion
//#region Pre sequelize code
// const Cart = require('./cart');
// const db = require('../utils/database')
// module.exports = class Products {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }
//     save() {
//         return db.execute('insert into products(title,price,description,imageUrl) values(?,?,?,?)', [this.title, this.price, this.description, this.imageUrl]);
//     }
//     static deleteById(productId) {
//     }
//     static fetchAll() {
//         return db.execute('select * from products');
//     }
//     // here callback sends the funcation calling it the return of a single product so we say callback product
//     static fetchProduct(prodId) {
//         return db.execute('select * from products where id=?', [prodId]);
//     }
// }
//#endregion
//#region MongoDb Schema


var mongoDb = require('mongodb');

var getDb = require('../utils/database').getDb;

var Product =
/*#__PURE__*/
function () {
  function Product(title, price, description, imageUrl, id, userId) {
    _classCallCheck(this, Product);

    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.userId = userId;
  }

  _createClass(Product, [{
    key: "save",
    value: function save() {
      var db = getDb();
      var dbOp;

      if (this._id) {
        //Update Product
        dbOp = db.collection('products').updateOne({
          _id: this._id
        }, {
          $set: this
        });
      } else {
        console.log(this);
        dbOp = db.collection('products').insertOne(this);
      }

      return dbOp.then(function (result) {})["catch"](function (err) {
        console.log(err);
      });
    }
  }], [{
    key: "fetchAll",
    value: function fetchAll() {
      var db = getDb();
      return db.collection('products').find().toArray().then(function (products) {
        return products;
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "findById",
    value: function findById(prodId) {
      var db = getDb();
      return db.collection('products').find({
        _id: new mongoDb.ObjectId(prodId)
      }).next().then(function (product) {
        return product;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "deleteById",
    value: function deleteById(prodId) {
      var db = getDb();
      return db.collection('products').deleteOne({
        _id: new mongoDb.ObjectId(prodId)
      }).then(function () {
        return console.log('Product Deleted');
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }]);

  return Product;
}(); //#endregion


module.exports = Product;