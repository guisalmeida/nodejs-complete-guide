const express = require('express');
const path = require('path');

const { adminRoutes } = require('./routes/admin.js')
const { shopRoutes } = require('./routes/shop.js');

const errorController = require('./controllers/errorController.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getError);

app.listen(3000);
