const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getAdminProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.deleteProduct)

module.exports = {
  adminRoutes: router
};
