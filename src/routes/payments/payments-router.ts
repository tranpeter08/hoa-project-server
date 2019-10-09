"use strict";
import express, {Request, Response, NextFunction} from 'express';
import 
  braintree, 
  { BraintreeGateway, 
    GatewayConfig,
    ValidatedResponse, 
    ClientToken,
    TransactionRequest,
    Transaction
  } from  'braintree';
import validate from './validate';
import config from '../../config';

const router = express.Router();

const gatewayConfig : GatewayConfig = {
  environment: braintree.Environment.Sandbox,
  merchantId: config.BRAINTREE_MERCHANT_ID,
  publicKey: config.BRAINTREE_PUBLIC_KEY,
  privateKey: config.BRAINTREE_PRIVATE_KEY
}

const gateway = new BraintreeGateway(gatewayConfig);

router.get('/client_token', (req: Request, res: Response, next: NextFunction) => {
  gateway.clientToken.generate({})
    .then((resp: ValidatedResponse<ClientToken>) => {
      if (!resp.success) {
        return res.status(400).json({message: resp.message});
      }

      return res.status(200).json({clientToken: resp.clientToken});
    })
    .catch((error: any) => {
      return next(error);
    });
});

router.post(
  '/', 
  validate.paymentFields, 
  (req: Request, res: Response, next: NextFunction) => {
    const {amount, customerId, nonce} = req.body;
    const transReq: TransactionRequest = {
      amount,
      paymentMethodNonce: nonce,
      customerId,
      options: {
        submitForSettlement: true,
        storeInVaultOnSuccess: true
      }
    }

    gateway.transaction.sale(transReq)
      .then((resp: ValidatedResponse<Transaction>) => {
        if (!resp.success) {
          return res.status(400).json({message: resp.message});
        };

        return res.status(200).json(resp);
      })
      .catch((err: any) => {
        res.status(500).json({message: err.message})
      });
});  

export default router;