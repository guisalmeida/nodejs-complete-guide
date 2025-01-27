const express = require('express');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/product', shopController.getProduct);
router.post('/add-product', shopController.postAddProduct);

module.exports = {
  shopRoutes: router
};
