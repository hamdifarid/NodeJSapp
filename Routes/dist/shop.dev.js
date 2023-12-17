"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var shopController = require('../controllers/shop'); // Routing Middlewares for get Requests


router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
router.get('/products/:productId', shopController.getProduct); // Routing Middlewares for post requests

router.post('/cart', shopController.postCart);
router.post('/cart/delete-item', shopController.postCartDelete);
module.exports = router;