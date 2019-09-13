const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {JWT_SECRET, JWT_EXPIRY} = require('../../config');
const app = require('../../app');

const UserService = require('../../services/UserService');

const authRouter = express.Router();

authRouter.post('/login', async (req, res, next) => {
  const db = req.app.get('db');
  const {username, password} = req.body;

  try {
    const results = await UserService.getUserLogin(db, username);
    const user = results[0];

    if (!user) {
      return res.status(400).json({message: 'Incorrect username'});
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

module.exports = authRouter;