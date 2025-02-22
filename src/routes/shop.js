const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const shopController = require('../controllers/shopController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);

router.get('/cart', isAuthenticated, shopController.getCart);
router.post('/cart', isAuthenticated, shopController.getPostCart);
router.post('/delete-cart-item', isAuthenticated, shopController.postDeleteCartItem);
router.get('/orders', isAuthenticated, shopController.getOrder);
router.post('/orders', isAuthenticated, shopController.postOrder);

module.exports = {
  shopRoutes: router
};
