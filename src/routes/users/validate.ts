import {Request, Response, NextFunction} from 'express'
import validate from '../validators';

const {
  isRequired,
  isString,
  isNum,
  isTrimmed,
  hasLength,
  notPassword,
  isEmail,
  isPhone,
  isUnitNum,
  validationError
} = validate;

interface LengthLimit {
  min: number,
  max: number
}

interface Lengths {
  username: LengthLimit,
  password: LengthLimit,
  [phone: string]: LengthLimit,
}

const lengths = <Lengths> {
  username: <LengthLimit> {min: 8},
  password: <LengthLimit> {min: 10}
};

export default {
  login(req: Request, res: Response, next: NextFunction) {
    const loginKeys = ['username', 'password'];

    for (const key of loginKeys) {
      const val = req.body[key];

      if (!val) {
        return validationError(
          res,
          `"${key}" is required`,
          key
        );
      }

      if (!isString(val)) {
        return validationError(
          res,
          `"${key}" must be a string.`,
          key
        )
      }

      if (!isTrimmed(val)) {
        return validationError(
          res,
          `"${key}" cannot be empty or have whitespace`,
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

    for (const field of requiredFields) {
      const val = req.body[field];

      if (!val) {
        return validationError(
          res,
          `"${field}" is required`,
          field
        );
      }

      const {min} = lengths[field];

      if (min && !hasLength(val, min)) {
        return validationError(
          res,
          `"${field}" should have at least ${min} characters`,
          field
        );
      }

      const isWrong = notPassword(val);

      if (field === 'password' && isWrong) {
        return validationError(
          res,
          isWrong,
          field
        );
      }
    };

    return next();
  },

  resident(req: Request, res: Response, next: NextFunction) {
    if (req.body.isAdmin) {
      return next();
    }

    const requiredFields = [
      'email', 
      'phone', 
      'first_name', 
      'last_name', 
      'unit_num'
    ];

    for (const field of requiredFields) {
      const val = req.body[field];

      if (!val) {
        return validationError(
          res,
          `"${field}" is required`,
          field
        )
      }

      if (field !== 'unit_num' && !isString(val)) {
        return validationError(
          res,
          `"${field}" must be a string.`,
          field
        );
      }
      
      if (field === 'unit_num' && !isNum(val)) {
        return validationError(
          res,
          `"${field}" must be a number.`,
          field
        );
      }

      if (!isRequired(val) || typeof val === 'string' && !isTrimmed(val)) {
        return validationError(
          res,
          `"${field}" cannot be empty`,
          field
        );
      }

      if (field === 'email' && !isEmail(val)) {
        return validationError(
          res,
          'Incorrect email format',
          field
        );
      }

      if (field === 'phone' && !isPhone(val)) {
        return validationError(
          res,
          'Incorrect phone format',
          field
        );
      }

      if (field === 'unit_num' && !isUnitNum(val)) {
        return validationError(
          res,
          'Invalid unit number',
          field
        );
      }
    }

    return next();
  }
}