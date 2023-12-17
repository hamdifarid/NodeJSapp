const Cart = require('../models/cart');
const Product = require('../models/product');

//#region Get Controller Methods

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list',
                { prods: rows, pageTitle: 'All product', path: '/products' });

        })
        .catch(err => console.log(err));

};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', { pageTitle: 'My Cart', path: '/cart', products: cartProducts });

        })
    })
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index',
                { prods: rows, pageTitle: 'Shop', path: '/' });

        })
        .catch(err => console.log(err));
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.fetchProduct(prodId, product => {
        res.render('shop/product-detail', { pageTitle: product.title, path: '/products', prod: product });
    })
}

//#endregion

//#region  Post Controller Methods

exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.fetchProduct(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    console.log(prodId);
    res.redirect('/products');
};
exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    Product.fetchProduct(prodId, (product) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};
//#endregion