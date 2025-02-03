const express = require('express');
const path = require('path');
const sequelize = require('./src/utils/database');

const { adminRoutes } = require('./src/routes/admin.js')
const { shopRoutes } = require('./src/routes/shop.js');

const errorController = require('./src/controllers/errorController.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

sequelize.sync().then((result) => {
  console.log(result);
  app.listen(3000);
}).catch(err => console.log(err));
