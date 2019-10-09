import {Response, Request, NextFunction} from 'express';

export default {
  paymentFields(req: Request, res: Response, next: NextFunction) {
    interface Fields {
      amount: true,
      nonce: true,
      [customerId: string]: true
    }

    const expected: Fields = {
      amount: true,
      nonce: true,
      customerId: true
    }

    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (!expected[key]) {
        return res.status(400).json({message: 'Invalid field in request'});
      }
    }

    return next();
  }
}