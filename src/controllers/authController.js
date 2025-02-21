/* eslint-disable no-unused-vars */

const { UserModel } = require("../models/userModel");

const getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);

  res.render('auth/login', {
    docTitle: 'Login',
    path: '/login',
    isAuthenticated: false
  });
}

const postLogin = (req, res, next) => {
  UserModel.findById('67b76d8121dcfdfc22b0ce27')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;

      // Just call redirect once session has saved on mongodb
      req.session.save((err) => {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
}

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) { console.log(err) }
    res.redirect('/login');
  });
}

module.exports = {
  getLogin,
  postLogin,
  postLogout
}
