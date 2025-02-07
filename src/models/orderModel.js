const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const OrderModel = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = { OrderModel };
