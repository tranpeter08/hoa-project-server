'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const usersRouter = require('./routes/users/users-router');

const passport = require('passport');
const {jwtStrat} = require('./passport-strategies');

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

passport.use(jwtStrat);

// routes
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(function errorHandler(error, req, res, next) {
    let response
     if (process.env.NODE_ENV === 'production') {
       response = { error: { message: 'server error' } }
     } else {
       console.error(error)
       response = { message: error.message, error }
     }
     res.status(500).json(response)
   })

module.exports = app;