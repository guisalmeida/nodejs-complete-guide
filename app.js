const express = require('express');
const path = require('path');
const sequelize = require('./src/utils/database');

const { ProductModel } = require('./src/models/productModel');
const { UserModel } = require('./src/models/userModel');
const { CartModel } = require('./src/models/cartModel');
const { CartProductModel } = require('./src/models/cartProductModel');

const { adminRoutes } = require('./src/routes/admin.js')
const { shopRoutes } = require('./src/routes/shop.js');

const errorController = require('./src/controllers/errorController.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  UserModel.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

ProductModel.belongsTo(UserModel, { constraints: true, onDelete: 'CASCADE' });
UserModel.hasMany(ProductModel);
UserModel.hasOne(CartModel);
CartModel.belongsTo(UserModel);
CartModel.belongsToMany(ProductModel, { through: CartProductModel })
ProductModel.belongsToMany(CartModel, { through: CartProductModel })

sequelize
  // use FORCE only in development mode
  // .sync({ force: true })
  .sync()
  .then(() => UserModel.findByPk(1))
  .then((user) => user ? user : UserModel.create({ name: 'Dude Dummy', email: 'dummy@test.com' }))
  .then((user) => user.createCart())
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
