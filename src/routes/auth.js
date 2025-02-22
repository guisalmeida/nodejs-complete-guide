const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', isAuthenticated, authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = {
  authRoutes: router
};
