/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const { UserModel } = require("../models/userModel");

const getLogin = (req, res, next) => {
  const [message] = req.flash('errorMessage');

  res.render('auth/login', {
    docTitle: 'Login',
    path: '/login',
    isAuthenticated: false,
    errorMessage: message
  });
}

const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  UserModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('errorMessage', 'User not found check your credentials!')
        return res.redirect('/login');
      }

      return bcrypt.compare(password, user.password)
        .then((isCorrectPass) => {
          if (isCorrectPass) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            // Just call redirect once session has saved on mongodb
            return req.session.save((err) => {
              if (err) console.log(err);
              res.redirect('/');
            });
          }
          req.flash('errorMessage', 'Invalid password!')
          res.redirect('/login');
        })
        .catch(err => {
          req.flash('errorMessage', err.message)
          return res.redirect('/login');
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

const getSignup = (req, res, next) => {
  const [message] = req.flash('errorMessage');

  res.render('auth/signup', {
    path: '/signup',
    docTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: message
  });
};

const postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  UserModel.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash('errorMessage', 'User already exists!')
        return res.redirect('/login');
      }

      return bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const user = new UserModel({
            email,
            password: hashedPassword,
            cart: { items: [] }
          });

          return user.save();
        })
        .then(() => {
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup
}
