'use strict';
import * as dotenv from 'dotenv';
import express, { Request, Response } from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import pg from 'pg';
import usersRouter from './routes/users/users-router';
import {jwtStrat} from './passport-strategies';
import config from './config';

dotenv.config();
pg.types.setTypeParser(20, 'text', parseInt)

const {NODE_ENV} = config;

// const {jwtStrat} = require('./passport-strategies');

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

// passport.use(jwtStrat);

// routes
app.use('/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  try {
    res.send('Hello World!');
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
  
});

app.post('/', (req: Request, res: Response) => {
  res.json({message: req.body});
});

export default app;