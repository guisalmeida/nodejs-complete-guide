// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'guidev87'
// });

// module.exports = pool.promise();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'guidev87', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
