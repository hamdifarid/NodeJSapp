const Cart = require('./cart');
const db = require('../utils/database')

module.exports = class Products {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }


    save() {

    }

    static deleteById(productId) {

    }

    static fetchAll() {
        return db.execute('select * from products');
    }

    // here callback sends the funcation calling it the return of a single product so we say callback product
    static fetchProduct(prodId) {

    }
}