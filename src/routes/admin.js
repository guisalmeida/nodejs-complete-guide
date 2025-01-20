const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const path = require('path');
const rootDir = require('../utils/path');

router.use(bodyParser.urlencoded({ extended: false }));

const products = [];

router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
  products.push(req.body.title);
  res.redirect('/');
});

module.exports = {
  adminRoutes: router,
  products: products
};
