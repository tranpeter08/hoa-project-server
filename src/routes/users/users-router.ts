'use strict';
import { Router,Request, NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../config';
import validate from './validate';
import validators from '../validators';
import Users from '../../services/UsersService';
import Residents from '../../services/ResidentsService';
import Units from '../../services/UnitsService';
import {Transaction} from "knex";

const usersRouter = Router();
const {JWT_EXPIRY, JWT_SECRET} = config;
const {isLogin, isUser, isResident} = validate;
const {validationError} = validators;

usersRouter.post(
  '/register', 
  isUser, 
  isResident, 
  async (req: Request, res: Response, next: NextFunction) => {
    const db: Transaction = req.app.get('db');
    const {username, password, is_admin, unit_num, ...resident} = req.body;

    try {
      const hasUser = await Users.getCount(db, 'username', username);

      if (hasUser) {
        return validationError(
          res,
          'Account already exists with that username',
          'username'
        )
      }

      const hasEmail = await Residents.hasEmail(db, resident.email);

      if (hasEmail) {
        return validationError(
          res,
          'Account already exists with that email',
          'email'
        )
      }

      const isVacant = await Units.isVacant(db, unit_num);
      
      if (!isVacant) {
        return validationError(
          res,
          'Account already exists for this unit',
          'unit_num'
        );
      }

      const newUser = await db.transaction(async function (trx) {
        const hash = await bcrypt.hash(password, 10);
        const user = await Users.createUser(trx, {username, password: hash, is_admin});

        resident.user_id = user.id;
        
        const resident_id = await Residents.createResident(trx, resident);
        await Units.addResident(trx, unit_num, resident_id);

        return user;
      });
    
      res.status(200).json(newUser);

    } catch (error) {
      return next(error);
    }
});

usersRouter.post(
  '/login', 
  isLogin, 
  async (req: Request, res: Response, next: NextFunction) => {
    const db: Transaction = req.app.get('db');

    try {
      const user = await Users.getUserLogin(db, req.body);
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
      return next(err);
    }
});

export default usersRouter;