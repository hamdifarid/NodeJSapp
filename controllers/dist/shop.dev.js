"use strict";

// const Cart = require('../models/cart');
var _require = require('pug'),
    render = _require.render;

var Product = require('../models/product'); //#region Get Controller Methods


exports.getProducts = function (req, res, next) {
  Product.fetchAll().then(function (products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products',
      path: '/products'
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getCart = function (req, res, next) {
  req.user.getCart().then(function (cart) {
    return cart.getProducts().then(function (products) {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  })["catch"](function (err) {
    return console.log(err);
  }); // Cart.getCart(cart => {
  //     Product.fetchAll(products => {
  //         const cartProducts = [];
  //         for (product of products) {
  //             const cartProductData = cart.products.find(prod => prod.id === product.id);
  //             if (cartProductData) {
  //                 cartProducts.push({ productData: product, qty: cartProductData.qty });
  //             }
  //         }
  //         res.render('shop/cart', { pageTitle: 'My Cart', path: '/cart', products: cartProducts });
  //     })
  // })
};

exports.getIndex = function (req, res, next) {
  Product.fetchAll().then(function (products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })["catch"](function (err) {
    console.log(err);
  }); //#region  Raw Sql
  // Product.fetchAll()
  //     .then(([rows, fieldData]) => {
  //         res.render('shop/index',
  //             { prods: rows, pageTitle: 'Shop', path: '/' });
  //     })
  //     .catch(err => console.log(err));
  //#endregion
};

exports.getCheckout = function (req, res, next) {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};

exports.getOrders = function (req, res, next) {
  req.user.getOrders({
    include: ['products']
  }).then(function (orders) {
    res.render('shop/orders', {
      pageTitle: 'Orders',
      path: '/orders',
      orders: orders
    });
  })["catch"](function (er) {
    return console.log(er);
  });
};

exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId;
  Product.findById(prodId).then(function (product) {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      prod: product
    });
  })["catch"](function (err) {
    return console.log(err);
  }); // Product.findByPk(prodId)
  //     .then(product => {
  //         res.render('shop/product-detail', { pageTitle: product.title, path: '/products', prod: product });
  //     })
  //     .catch(err => { console.log(err) });
}; //#endregion
//#region  Post Controller Methods


exports.postCart = function (req, res, next) {
  var prodId = req.body.prodId;
  var fetchedCart;
  var newQuantity = 1;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    var product;

    if (products.length > 0) {
      product = products[0];
    }

    if (product) {
      var oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }

    return Product.findByPk(prodId).then(function (product) {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity
        }
      });
    }).then(function (result) {
      return res.redirect('/cart');
    })["catch"](function (err) {
      return console.log(err);
    });
  }).then(function (product) {
    return fetchedCart.addProduct(product, {
      through: {
        quantity: newQuantity
      }
    });
  }).then(function () {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postCartDelete = function (req, res, next) {
  var prodId = req.body.productId;
  req.user.getCart().then(function (cart) {
    return cart.getProducts({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    var product = products[0];
    product.cartItem.destroy();
  }).then(function (result) {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postOrder = function (req, res, next) {
  var fetchedCart;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(function (products) {
    return req.user.createOrder().then(function (order) {
      return order.addProducts(products.map(function (product) {
        product.orderItem = {
          quantity: product.cartItem.quantity
        };
        return product;
      }));
    })["catch"](function (err) {
      return console.log(err);
    });
  }).then(function (result) {
    fetchedCart.setProducts(null);
  }).then(function (result) {
    res.redirect('/orders');
  })["catch"](function (err) {
    return console.log(err);
  });
}; //#endregion