const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const shopController = require('../controllers/shopController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.getPostCart);
router.post('/delete-cart-item', shopController.deleteCartItem);

router.get('/orders', shopController.getOrder);
router.post('/orders', shopController.postOrder);

module.exports = {
  shopRoutes: router
};
