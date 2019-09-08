'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {PORT} = require('./config');

const app = express();

const corsOptions = {
  // cors options here
};

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});