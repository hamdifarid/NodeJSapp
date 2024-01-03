"use strict";

var path = require('path');

var express = require('express');

var bodyParser = require('body-parser');

var User = require('./models/user');

var errorController = require('./controllers/error');

var app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(function (req, res, next) {
  User.findUserById('6593dd253d92d186a73b5537').then(function (user) {
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
});

var adminRoutes = require('./Routes/admin');

var shopRoutes = require('./Routes/shop'); // const CartItem = require('./models/cart-item');
// const Cart = require('./models/cart');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');


var mongoConnect = require('./utils/database').mongoConnect;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.noPage); //#region Sequalize Code
// // The code below is called association where sequalize automatically maps foreign keys with their respect reference primary keys in other tables
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // Userid will be associated to produc
// User.hasMany(Product); // Many Userids can be associated to products
// User.hasOne(Cart) // 1 Userid will be associated to Cart
// Cart.belongsTo(User) // Userid will be associated to Cart
// Cart.belongsToMany(Product, { through: CartItem }); // Cartritem will contain both productId and Cartid
// Product.belongsToMany(Cart, { through: CartItem }); // Cartritem will contain both productId and Cartid
// Order.belongsTo(User);
// User.hasMany(Order)
// Order.belongsToMany(Product, { through: OrderItem });
// sequelize
//     // .sync({ force: true })
//     .sync()
//     .then(result => {
//         return User.findByPk(1);
//         // console.log(result);
//     })
//     .then(user => {
//         if (!user) {
//             return User.create({ name: 'Hamdi', email: 'test@gmail.com' });
//         }
//         return user;
//     })
//     .then(user => {
//         var cart = Cart.findByPk(1).then(cart => {
//             if (!cart) {
//                 user.createCart()
//             }
//         })
//     })
//     .then(cart => {
//         app.listen(3000)
//     })
//     .catch(err => {
//         console.log(err);
//     });
//#endregion

mongoConnect(function () {
  console.log('connected');
  app.listen(3000);
});