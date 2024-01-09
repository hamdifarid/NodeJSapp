"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//#region MongoDb Schema
var getDb = require('../utils/database').getDb;

var mongoDb = require('mongodb');

var User =
/*#__PURE__*/
function () {
  function User(username, email, cart, id) {
    _classCallCheck(this, User);

    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  _createClass(User, [{
    key: "save",
    value: function save() {
      var db = getDb();
      return db.collection('users').insertOne(this);
    }
  }, {
    key: "addToCart",
    value: function addToCart(product) {
      var cartProduct = this.cart.items.findIndex(function (cp) {
        return cp._id === product._id;
      });
      var updatedCart = {
        items: [_objectSpread({}, product, {
          quantity: 1
        })]
      };
      var db = getDb();
      db.collection('users').updateOne({
        _id: new mongoDb.ObjectId(this._id)
      }, {
        $set: {
          cart: updatedCart
        }
      });
    }
  }], [{
    key: "findUserById",
    value: function findUserById(userId) {
      var db = getDb();
      return db.collection('users').find({
        _id: new mongoDb.ObjectId(userId)
      }).next().then(function (user) {
        return user;
      })["catch"](function (err) {
        return console.log(err);
      }); //you can also use fineOne so you dont need next()
    }
  }]);

  return User;
}(); //#endregion
//#region Sequelize Schema
// const {Sequelize} = require('sequelize')
// const sequelize = require('../utils/database');
// const User = sequelize.define('users', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING
// });
//#endregion


module.exports = User;