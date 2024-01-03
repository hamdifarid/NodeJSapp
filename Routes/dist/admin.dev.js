"use strict";

var express = require('express');

var router = express.Router();

var adminController = require('../controllers/admin'); // // Middleware get routes


router.get('/add-product', adminController.getAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.get('/products', adminController.getProductsAdmin); // // Middleware post routes

router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;