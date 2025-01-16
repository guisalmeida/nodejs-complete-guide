const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('all middleware!');
  next(); // Allows the request to continue to the next middleware in line
});

app.use('/test', (req, res, next) => {
  console.log('In test middleware!');
  res.send('<h1>Hello from test!</h1>');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from home!</h1>');
});

app.listen(3000);
