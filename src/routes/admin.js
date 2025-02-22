const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/add-product', isAuthenticated, adminController.getAddProduct);
router.post('/add-product', isAuthenticated, adminController.postAddProduct);
router.get('/products', isAuthenticated, adminController.getAdminProducts);
router.get('/edit-product/:productId', isAuthenticated, adminController.getEditProduct);
router.post('/edit-product', isAuthenticated, adminController.postEditProduct);
router.post('/delete-product', isAuthenticated, adminController.deleteProduct)

module.exports = {
  adminRoutes: router
};
