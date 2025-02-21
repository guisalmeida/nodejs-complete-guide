const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const authController = require('../controllers/authController');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);


module.exports = {
  authRoutes: router
};
