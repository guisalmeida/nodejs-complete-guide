const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const errorController = require('./src/controllers/errorController');
const { adminRoutes } = require('./src/routes/admin');
const { shopRoutes } = require('./src/routes/shop');
const { authRoutes } = require('./src/routes/auth');
const { UserModel } = require('./src/models/userModel');

require('dotenv').config();

const app = express();

const uri = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@cluster0.iij6l.mongodb.net/shop`;
const store = new MongoDBStore({
  uri: uri,
  collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: store,
}));
app.use(csrf());
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  UserModel.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);
app.use(errorController.getError);

mongoose.connect(uri)
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
