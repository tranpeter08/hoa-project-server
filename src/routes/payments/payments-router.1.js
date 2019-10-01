"use strict";
const express = require('express');
const braintree = require('braintree');

const paymentRouter = express.Router();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "kb6tqvbmdf9nrqgq",
  publicKey: "w8yk6x8m8ngyxd2z",
  privateKey: "26b50f5a28fada0017808569fdbeb882"
});

paymentRouter.get('/client_token', (req, res, next) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      console.log('client token error', err);
      return res.status(500).json({message: err});
    }

    res.send(response.clientToken);
  });
});

module.exports = paymentRouter;