

//#region MongoDb Schema
const getDb = require('../utils/database').getDb;
const mongoDb = require('mongodb');
class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id
    }

    save() {
        const db = getDb()
        return db.collection('users').insertOne(this);
    }

    static findUserById(userId) {
        const db = getDb()
        return db.collection('users').find({ _id: new mongoDb.ObjectId(userId) })
            .next()
            .then((user) => {
                return user;
            })
            .catch(err => console.log(err))
        //you can also use fineOne so you dont need next()
    }

    addToCart(product) {
        const cartProduct = this.cart.items.findIndex(cp => {
            return cp._id === product._id
        });
        const updatedCart = { items: [{ ...product, quantity: 1 }] };
        const db = getDb();
        db.collection('users').updateOne({ _id: new mongoDb.ObjectId(this._id) });
    }
}
//#endregion


//#region Sequelize Schema
// const {Sequelize} = require('sequelize')
// const sequelize = require('../utils/database');

// const User = sequelize.define('users', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING
// });
//#endregion
module.exports = User;