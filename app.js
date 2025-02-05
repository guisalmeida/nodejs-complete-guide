const express = require('express');
const path = require('path');
const sequelize = require('./src/utils/database');

const Product = require('./src/models/productModel');
const User = require('./src/models/userModel');

const { adminRoutes } = require('./src/routes/admin.js')
const { shopRoutes } = require('./src/routes/shop.js');

const errorController = require('./src/controllers/errorController.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // use FORCE only in development mode
  // .sync({ force: true })
  .sync()
  .then(() => User.findByPk(1))
  .then((user) => user ? user : User.create({ name: 'Dude Dummy', email: 'dummy@test.com' }))
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
