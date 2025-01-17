const express = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

app.listen(3000);
