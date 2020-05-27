const express = require('express');
const constants = require('./config/constants');
const middlewareConfig = require('./config/middleware');

const app = express();
middlewareConfig(app);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running on port: ${constants.PORT}
      -- - Running on ${process.env.NODE_ENV}
      -- - Make something great!)
    `);
  }
});