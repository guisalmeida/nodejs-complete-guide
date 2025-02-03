const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'guidev87', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
