const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

const products = [];

router.get('/add-product', (req, res) => {
  res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' });
});

router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = {
  adminRoutes: router,
  products: products
};
