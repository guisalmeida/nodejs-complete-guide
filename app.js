const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./src/controllers/errorController');
const { adminRoutes } = require('./src/routes/admin');
const { shopRoutes } = require('./src/routes/shop');

// const { UserModel } = require('./src/models/userModel');

require('dotenv').config();

const app = express();

const uri = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@cluster0.iij6l.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   UserModel.findById('67ae4a0b1821298ee913ab95')
//     .then((user) => {
//       req.user = new UserModel(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

mongoose.connect(uri)
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
