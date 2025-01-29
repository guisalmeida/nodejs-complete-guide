const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

const users = [];

router.get('/', (req, res) => {
  res.render('users', { docTitle: 'Users', users: users });
});

router.post('/add-user', (req, res) => {
  users.push({ name: req.body.name });
  res.redirect('/users');
});

module.exports = {
  usersRoutes: router
};
