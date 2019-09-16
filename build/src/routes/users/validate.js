"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const validate = require('../validators');
const validators_1 = __importDefault(require("../validators"));
exports.default = {
    login(req, res, next) {
        const loginKeys = ['username', 'password'];
        const reqKeys = Object.keys(req.body);
        for (const key of loginKeys) {
            if (!reqKeys.includes(key)) {
                return validators_1.default.sendError(res, 400, `Missing required field "${key}"`, key);
            }
            const val = req.body[key];
            if (!validators_1.default.isRequired(val) || !validators_1.default.isTrimmed(val)) {
                return validators_1.default.sendError(res, 400, `"${key}" cannot be empty or contain white space.`, key);
            }
        }
        return next();
    },
    register(req, res, next) {
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
};
