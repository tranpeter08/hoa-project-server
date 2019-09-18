'use strict';
const validate = require('../validators');

module.exports = {
  login(req, res, next) {

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

  register(req, res, next) {

    // validate required fields
    // validate lengths
    // validate password format
    // validate email format
    // validate phone format
    // validate unit number
    


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