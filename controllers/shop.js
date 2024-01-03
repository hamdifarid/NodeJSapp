// const Cart = require('../models/cart');
const { render } = require('pug');
const Product = require('../models/product');

//#region Get Controller Methods

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list',
                { prods: products, pageTitle: 'Products', path: '/products' });
        })
        .catch(err => {
            console.log(err)
        });

};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts().then(products => {
                res.render('shop/cart', { pageTitle: 'Your Cart', path: '/cart', products: products })
            }).catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    // Cart.getCart(cart => {
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

exports.getIndex = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('shop/index',
                { prods: products, pageTitle: 'Shop', path: '/' });
        })
        .catch(err => {
            console.log(err)
        });

    //#region  Raw Sql
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/index',
    //             { prods: rows, pageTitle: 'Shop', path: '/' });

    //     })
    //     .catch(err => console.log(err));
    //#endregion
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {

            res.render('shop/orders', { pageTitle: 'Orders', path: '/orders', orders: orders });

        })
        .catch(er => console.log(er))
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', { pageTitle: product.title, path: '/products', prod: product })
        })
        .catch(err => console.log(err))
    // Product.findByPk(prodId)
    //     .then(product => {
    //         res.render('shop/product-detail', { pageTitle: product.title, path: '/products', prod: product });
    //     })
    //     .catch(err => { console.log(err) });
}

//#endregion

//#region  Post Controller Methods

exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            let product
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId)
                .then(product => {
                    return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
                })
                .then(result => {
                    return res.redirect('/cart')
                })
                .catch(err => console.log(err))
        })
        .then((product) => {
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })

        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
};

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            const product = products[0]
            product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))

};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder().then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product
                }))
            })
                .catch(err => console.log(err));
        })
        .then(result => {
            fetchedCart.setProducts(null)
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err));
};
//#endregion