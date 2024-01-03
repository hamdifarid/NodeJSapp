const { mongo } = require('mongoose');
const Product = require('../models/product');
const mongodb = require('mongodb');
// Get action methods 
exports.getProductsAdmin = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', { pageTitle: 'Admin Products', prods: products, path: 'admin/products' })
        })
        .catch(err => {
            console.log(err);
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
    // if you want to find all the products linked to the current user in req.user then do this 
    // req.user.getProducts({ where: { id: prodId } })
    Product.findById(prodId)
        // Product.findByPk(prodId) normal way of finding but without any association
        .then(product => {
            // const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                prod: product
            });
        })
        .catch(err => console.log(err))
};

// Post action methods

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, new mongodb.ObjectId(prodId))
    product
        .save()
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
    //Update statement for Sequelize if product does not exist it will create 
    // return product.save();

}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id)
    product
        .save()
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch();


    // magic association when u use User has many product then it automatically creates User.create
    // creating Product with User foriegn key 
    // Right now a middle ware is adding an user object to all incoming requests with an ID of the current user 
    // req.user.createProduct({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,

    // })
    //     .then(() => {
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err))


    //insert into for sequelize without foriegn key
    // Product.create().then(result => {
    //     console.log(`Created a the product whose title is ${title}`);
    //     res.redirect('/admin/products');
    // }).catch(err => {
    //     console.log(err)
    // });



    //#region Raw sql promise way
    // const product = new Product(null, title, imageUrl, description, price);
    // product.save()
    //     .then(() => { res.redirect('/') })
    //     .catch(err => { console.log(err) });
    //#endregion
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.deleteById(productId)
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch(err => { console.log(err) })

    // Product.findByPk(productId)
    //     .then(product => {
    //         return product.destroy();
    //     })
    //     .then(() => {
    //         console.log('Product has been deleted');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // Product.deleteById(productId);
};