const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const CartModel = sequelize.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = { CartModel };
