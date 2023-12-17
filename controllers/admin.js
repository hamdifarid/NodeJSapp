const Product = require('../models/product');

// Get action methods 
exports.getProductsAdmin = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { pageTitle: 'Admin Products', prods: products, path: 'admin/products' });
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { pageTitle: 'Add Product', path: 'admin/add-product', editing: false });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.fetchProduct(prodId, (product) => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { pageTitle: 'Edit Product', path: 'admin/edit-product', editing: editMode, prod: product });
    });
};

// Post action methods

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/');
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
};