const express = require('express');

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  res.send('LOGIN');
});

authRouter.post('/login/admin', (req, res) => {
  res.send('LOGIN Admin');
});

module.exports = authRouter;