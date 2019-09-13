const express = require('express');
const 

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  const {username, password} = req.body;  
});

module.exports = authRouter;