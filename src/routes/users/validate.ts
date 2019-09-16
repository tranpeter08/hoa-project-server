import {Request, Response, NextFunction} from 'express'

// const validate = require('../validators');

import validate from '../validators';

export default {
  login(req: Request, res: Response, next: NextFunction) {

    const loginKeys = ['username', 'password'];
    const reqKeys = Object.keys(req.body);

    for (const key of loginKeys) {
      
      if (!reqKeys.includes(key)) {
        return validate.sendError(
          res,
          400,
          `Missing required field "${key}"`,
          key
        );
      }

      const val = req.body[key];

      if (!validate.isRequired(val) || !validate.isTrimmed(val)) {
        return validate.sendError(
          res,
          400,
          `"${key}" cannot be empty or contain white space.`,
          key
        );
      }
    }

    return next();
  },

  register(req: Request, res: Response, next: NextFunction) {
    // const lengths = {
    //   username: {min: 8},
    //   password: {min: 10}
    // };

    // if (!validate.hasLength(val, lengths[key].min)) {
    //   return validate.sendError(
    //     res,
    //     400,
    //     `"${key}" must be at least ${lengths[key].min} characters long.`,
    //     key
    //   );
    // }
  }
}