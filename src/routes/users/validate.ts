import {Request, Response, NextFunction} from 'express'
import validate from '../validators';

const {sendError} = validate;

interface LengthLimit {
  min: number,
  max: number
}

interface Lengths {
  username: LengthLimit,
  [password: string]: LengthLimit
}

const lengths = <Lengths> {
  username: <LengthLimit> {min: 8},
  password: <LengthLimit> {min: 10}
};

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

  user(req: Request, res: Response, next: NextFunction) {
    const requiredFields = [
      'username', 
      'password', 
    ];
    
    const reqKeys = Object.keys(req.body);

    for (const field of requiredFields) {
      if (!reqKeys.includes(field)) {
        return sendError(
          res,
          400,
          `Missing required field: ${field}`,
          field
        );
      }

      const val = req.body[field];
      const {min} = lengths[field];

      if (!validate.hasLength(val, min)) {
        return sendError(
          res,
          400,
          `"${field}" should have at least ${min} characters`,
          field
        );
      }

      const isWrong = validate.wrongFormat(val);

      if (field === 'password' && isWrong) {
        return sendError(
          res,
          400,
          isWrong,
          field
        );
      }


    };

    // validate required fields
    // validate lengths
    // validate password format
    // validate email format
    // validate phone format
    // validate unit number
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
  },

  resident(req: Request, res: Response, next: NextFunction) {
    const requiredFields = [
      'email', 
      'phone', 
      'first_name', 
      'last_name', 
      'unit_num'
    ];
  }
}