"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var sequelize = require('../utils/database');

var OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});
module.exports = OrderItem;