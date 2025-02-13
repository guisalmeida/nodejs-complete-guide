const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./src/controllers/errorController');
const { adminRoutes } = require('./src/routes/admin');
const { shopRoutes } = require('./src/routes/shop');
const { mongoConnect } = require('./src/utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.getError);

mongoConnect(() => {
  app.listen(3000);
});
