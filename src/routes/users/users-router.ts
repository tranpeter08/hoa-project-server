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
const {login, user, resident} = validate;
const {validationError} = validators;

usersRouter.post(
  '/register', 
  user, 
  resident, 
  async (req: Request, res: Response) => {
    const db: Transaction = req.app.get('db');
    const {username, password, unit_num, ...resident} = req.body;

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

      const row = await db.transaction(async function (trx) {
        const user_pw = bcrypt.hash(password, 10);
        const userIds = await trx('users').insert({username, user_pw}, 'id');
        
        resident.user_id = userIds[0];

        const residentIds = await trx('residents').insert(resident, 'id');
        await trx('units').update({resident_id: residentIds[0]}).where({unit_num});

        return await trx.from('residents').innerJoin('units', 'residents.id', 'units.resident_id');
      });
    
      res.status(200).json(row[0]);

    } catch (error) {
      res.status(500).json({message: 'error', code: error.code});
    }
});

usersRouter.post(
  '/login', 
  login, 
  async (req: Request, res: Response, next: NextFunction) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    const user_pw = bcrypt.hashSync(password, 10);

    try {
      const user = await Users.getUserLogin(db, username, user_pw);
      if (!user) {
        return res
          .status(404)
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