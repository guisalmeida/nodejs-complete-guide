const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.get('/products', adminController.getAdminProducts);

module.exports = {
  adminRoutes: router
};
