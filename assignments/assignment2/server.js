const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  res.send('<h1>users</h1>')
});

app.use('/', (req, res, next) => {
  res.send('<h1>any page</h1>')
});

app.listen(3000);
