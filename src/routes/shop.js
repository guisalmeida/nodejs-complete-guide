const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const shopController = require('../controllers/shopController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.getPostCart);
router.get('/order', shopController.getOrder);
router.get('/checkout', shopController.getCheckout);
router.get('/product/:productId', shopController.getProduct);

module.exports = {
  shopRoutes: router
};
