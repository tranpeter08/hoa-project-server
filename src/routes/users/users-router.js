'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {JWT_SECRET, JWT_EXPIRY} = require('../../config');
const UserService = require('../../services/UsersService');
const validate = require('./validate');
const {sendError} = require('../validators');

const usersRouter = Router();

usersRouter.post('/register', async (req, res) => {
  const db = req.app.get('db');
  const {username, password} = req.body;
  // validate entry
  // check if username, or email is taken
  // insert into users
  // check if resident, add resident info
  try {
    const [{count: users}] = await UserService.getCount(db, 'username',username);

    if (users) {
      return sendError(
        res, 
        400, 
        'Account already exists with that username.',
        'username'
      )
    }

    const [{count : emails}] = await UserService.getCount(db, 'username',username);

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

usersRouter.post('/login', validate.login, async (req, res, next) => {
  const db = req.app.get('db');
  const {username, password} = req.body;
  const user_pw = bcrypt.hashSync(password, 10);

  try {
    const results = await UserService.getUserLogin(db, username, user_pw);
    const user = results[0];

    if (!user) {
      return res.status(404).json({message: 'User not found.'});
    }

    const isValid = await bcrypt.compare(password, user.user_pw);

    if (!isValid) {
      return res.status(400).json({message: 'Incorrect password'});
    }

    delete user.user_pw;

    const jwtOpts = {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRY,
    }

    const authToken = jwt.sign(user, JWT_SECRET, jwtOpts);

    res.status(200).json({authToken});

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = usersRouter;