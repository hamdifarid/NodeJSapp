"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Cart = require('../models/cart');

var Product = require('../models/product'); //#region Get Controller Methods


exports.getProducts = function (req, res, next) {
  Product.fetchAll().then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        rows = _ref2[0],
        fieldData = _ref2[1];

    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All product',
      path: '/products'
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getCart = function (req, res, next) {
  Cart.getCart(function (cart) {
    Product.fetchAll(function (products) {
      var cartProducts = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          product = _step.value;
          var cartProductData = cart.products.find(function (prod) {
            return prod.id === product.id;
          });

          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      res.render('shop/cart', {
        pageTitle: 'My Cart',
        path: '/cart',
        products: cartProducts
      });
    });
  });
};

exports.getIndex = function (req, res, next) {
  Product.fetchAll().then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        rows = _ref4[0],
        fieldData = _ref4[1];

    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

exports.getOrders = function (req, res, next) {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  });
};

exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId;
  Product.fetchProduct(prodId, function (product) {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      prod: product
    });
  });
}; //#endregion
//#region  Post Controller Methods


exports.postCart = function (req, res, next) {
  var prodId = req.body.prodId;
  Product.fetchProduct(prodId, function (product) {
    Cart.addProduct(prodId, product.price);
  });
  console.log(prodId);
  res.redirect('/products');
};

exports.postCartDelete = function (req, res, next) {
  var prodId = req.body.productId;
  Product.fetchProduct(prodId, function (product) {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}; //#endregion