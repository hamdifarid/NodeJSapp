"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cart = require('./cart');

var db = require('../utils/database');

module.exports =
/*#__PURE__*/
function () {
  function Products(id, title, imageUrl, description, price) {
    _classCallCheck(this, Products);

    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  _createClass(Products, [{
    key: "save",
    value: function save() {}
  }], [{
    key: "deleteById",
    value: function deleteById(productId) {}
  }, {
    key: "fetchAll",
    value: function fetchAll() {
      return db.execute('select * from products');
    } // here callback sends the funcation calling it the return of a single product so we say callback product

  }, {
    key: "fetchProduct",
    value: function fetchProduct(prodId) {}
  }]);

  return Products;
}();