const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const UserModel = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

module.exports = { UserModel };
