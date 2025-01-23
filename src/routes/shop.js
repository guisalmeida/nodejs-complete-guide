const express = require('express');

const router = express.Router();

const { products } = require('./admin.js');

router.get('/', (req, res) => {
  res.render('shop', {
    prods: products,
    docTitle: 'Shop',
    path: '/',
  });
});

module.exports = {
  shopRoutes: router
};
