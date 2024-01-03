"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var sequelize = require('../utils/database');

var Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = Order;