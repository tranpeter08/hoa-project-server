"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = __importDefault(require("../validators"));
const { sendError } = validators_1.default;
const lengths = {
    username: { min: 8 },
    password: { min: 10 }
};
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
    user(req, res, next) {
        const requiredFields = [
            'username',
            'password',
        ];
        const reqKeys = Object.keys(req.body);
        for (const field of requiredFields) {
            if (!reqKeys.includes(field)) {
                return sendError(res, 400, `Missing required field: ${field}`, field);
            }
            const val = req.body[field];
            const { min } = lengths[field];
            if (!validators_1.default.hasLength(val, min)) {
                return sendError(res, 400, `"${field}" should have at least ${min} characters`, field);
            }
            const isWrong = validators_1.default.wrongFormat(val);
            if (field === 'password' && isWrong) {
                return sendError(res, 400, isWrong, field);
            }
        }
        ;
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
    resident(req, res, next) {
        const requiredFields = [
            'email',
            'phone',
            'first_name',
            'last_name',
            'unit_num'
        ];
    }
};
