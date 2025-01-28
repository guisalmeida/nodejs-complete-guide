const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const shopController = require('../controllers/shopController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/order', shopController.getOrder);
router.get('/checkout', shopController.getCheckout);
router.get('/product', shopController.getProduct);
router.post('/add-product', shopController.postAddProduct);

module.exports = {
  shopRoutes: router
};
