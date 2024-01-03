//#region Sequelize Schema Setup
// const {Sequelize} = require('sequelize')
// const sequelize = require('../utils/database');

const { ObjectId } = require('mongodb');

// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });
//#endregion

//#region Pre sequelize code
// const Cart = require('./cart');
// const db = require('../utils/database')

// module.exports = class Products {
//     constructor(id, title, imageUrl, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }


//     save() {
//         return db.execute('insert into products(title,price,description,imageUrl) values(?,?,?,?)', [this.title, this.price, this.description, this.imageUrl]);
//     }

//     static deleteById(productId) {

//     }

//     static fetchAll() {
//         return db.execute('select * from products');
//     }

//     // here callback sends the funcation calling it the return of a single product so we say callback product
//     static fetchProduct(prodId) {
//         return db.execute('select * from products where id=?', [prodId]);
//     }
// }

//#endregion

//#region MongoDb Schema
const mongoDb = require('mongodb');
const getDb = require('../utils/database').getDb;
class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongoDb.ObjectId(id) : null;
        this.userId = userId
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            //Update Product
            dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
        }
        else {
            console.log(this)
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => { })
            .catch(err => { console.log(err) });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(prodId) {
        const db = getDb();

        return db.collection('products')
            .find({ _id: new mongoDb.ObjectId(prodId) })
            .next()
            .then(product => {
                return product;
            })
            .catch(err => { console.log(err) });
    }

    static deleteById(prodId) {
        const db = getDb();

        return db.collection('products')
            .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
            .then(() => console.log('Product Deleted'))
            .catch((err) => console.log(err))
    }
}

//#endregion

module.exports = Product;