"use strict";

var Product = require('../models/product'); // Get action methods 


exports.getProductsAdmin = function (req, res, next) {
  Product.fetchAll(function (products) {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      prods: products,
      path: 'admin/products'
    });
  });
};

exports.getAddProduct = function (req, res, next) {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: 'admin/add-product',
    editing: false
  });
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  var prodId = req.params.productId;
  Product.fetchProduct(prodId, function (product) {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: 'admin/edit-product',
      editing: editMode,
      prod: product
    });
  });
}; // Post action methods


exports.postEditProduct = function (req, res, next) {
  var prodId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedImageUrl = req.body.imageUrl;
  var updatedPrice = req.body.price;
  var updatedDescription = req.body.description;
  var updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect('/');
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var price = req.body.price;
  var description = req.body.description;
  var product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = function (req, res, next) {
  var productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect('/admin/products');
};