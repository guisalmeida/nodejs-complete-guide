const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const CartProductModel = sequelize.define('cart_product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: DataTypes.INTEGER
});

module.exports = { CartProductModel };
