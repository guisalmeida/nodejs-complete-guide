const express = require('express');
const path = require('path');

const { homeRoute } = require('./routes/home.js');
const { usersRoutes } = require('./routes/users.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoute);
app.use('/users', usersRoutes);

app.use((req, res) => {
  res.status(404).render('not-found', { docTitle: 'Page Not Found' });
});

app.listen(3000);
