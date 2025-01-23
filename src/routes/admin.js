const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product', productController.getAddProduct);
router.post('/add-product', productController.postAddProduct);

module.exports = {
  adminRoutes: router
};
