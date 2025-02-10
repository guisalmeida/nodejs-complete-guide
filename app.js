const express = require('express');
const path = require('path');

const { adminRoutes } = require('./src/routes/admin');
const { mongoConnect } = require('./src/utils/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/admin', adminRoutes);

mongoConnect(() => {
  app.listen(3000);
});
