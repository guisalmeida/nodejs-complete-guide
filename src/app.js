const express = require('express');
const path = require('path');

const { adminRoutes } = require('./routes/admin.js')
const { shopRoutes } = require('./routes/shop.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render('not-found', { docTitle: 'Page Not Found' });
});

app.listen(3000);
