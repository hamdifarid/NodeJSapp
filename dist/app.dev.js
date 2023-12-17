"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var adminRoute = require('./Routes/admin');

var shopRoute = require('./Routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views'); // The views folder is default just adding it here for future understanding

var path = require('path');

var errorController = require('./controllers/error');

var db = require('./utils/database');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public'))); //appends the /admin to the route beginning /admin/end-point

app.use('/admin', adminRoute);
app.use(shopRoute); //adding a 404 page if none of the middle wares hit it defaults to this page 

app.use(errorController.noPage);
app.listen(3000);