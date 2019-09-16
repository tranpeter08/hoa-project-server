'use strict';
import { Router,Request, NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import Service from '../../services/UsersService';
import validate from './validate';
import validators from '../validators';

const usersRouter = Router();
const {JWT_EXPIRY, JWT_SECRET} = config;
const {sendError} = validators;

usersRouter.post('/register', async (req: Request, res: Response) => {
  const db = req.app.get('db');
  const {username, password} = req.body;
  // validate entry
  // check if username, or email is taken
  // insert into users
  // check if resident, add resident info
  try {
    const [{count: users}] = await Service.getCount(db, 'username',username);

    if (users) {
      return sendError(
        res, 
        400, 
        'Account already exists with that username.',
        'username'
      )
    }

    const [{count : emails}] = await Service.getCount(db, 'username',username);

    if (emails) {
      return sendError(
        res, 
        400, 
        'Account already exists with that email.',
        'email'
      )
    }
  
    res.status(200).json({message: 'ok'});
  } catch (error) {
    console.log(error);
    res.status(400).json({message: 'ok'});
  }
});

usersRouter.post(
  '/login', 
  validate.login, 
  async (req: Request, res: Response, next: NextFunction) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    const user_pw = bcrypt.hashSync(password, 10);

    try {
      const user = await Service.getUserLogin(db, username, user_pw);

      if (!user) {
        return res
          .status(400)
          .json({message: 'Incorrect username or password.'});
      }

      const jwtOpts = {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRY,
      }

      const authToken = jwt.sign(user, JWT_SECRET, jwtOpts);

      res.status(200).json({authToken});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

export default usersRouter;