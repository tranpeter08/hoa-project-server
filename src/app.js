'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const authRouter = require('./routes/auth/auth-router');

const app = express();

const morganFormat = NODE_ENV === 'production' ? 'tiny' : 'common';
const morganOptions = {
  skip: () => NODE_ENV === 'test'
};

const corsOptions = {
  // cors options here
};

app.use(morgan(morganFormat, morganOptions));
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;