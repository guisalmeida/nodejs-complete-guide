const express = require('express');

const router = express.Router();

const path = require('path');
const rootDir = require('../utils/path');

const { products } = require('./admin.js');

router.get('/', (req, res) => {
  console.log(products);
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = {
  shopRoutes: router
};
