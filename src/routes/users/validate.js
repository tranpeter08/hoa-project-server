"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = __importDefault(require("../validators"));
const { isRequired, isString, isNum, isTrimmed, hasLength, notPassword, isEmail, isPhone, isUnitNum, validationError } = validators_1.default;
const lengths = {
    username: { min: 8 },
    password: { min: 10 }
};
exports.default = {
    isLogin(req, res, next) {
        const loginKeys = ['username', 'password'];
        for (const key of loginKeys) {
            const val = req.body[key];
            if (!val) {
                return validationError(res, `"${key}" is required`, key);
            }
            if (!isString(val)) {
                return validationError(res, `"${key}" must be a string.`, key);
            }
            if (!isTrimmed(val)) {
                return validationError(res, `"${key}" cannot be empty or have whitespace`, key);
            }
        }
        return next();
    },
    isUser(req, res, next) {
        const { is_admin } = req.body;
        if (is_admin !== undefined && typeof is_admin !== 'boolean') {
            return validationError(res, 'Invalid data type for "is_admin"', 'is_admin');
        }
        const requiredFields = [
            'username',
            'password',
        ];
        for (const field of requiredFields) {
            const val = req.body[field];
            if (!val) {
                return validationError(res, `"${field}" is required`, field);
            }
            const { min } = lengths[field];
            if (min && !hasLength(val, min)) {
                return validationError(res, `"${field}" should have at least ${min} characters`, field);
            }
            const isWrong = notPassword(val);
            if (field === 'password' && isWrong) {
                return validationError(res, isWrong, field);
            }
        }
        ;
        return next();
    },
    isResident(req, res, next) {
        if (req.body.is_admin) {
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
                return validationError(res, `"${field}" is required`, field);
            }
            if (field !== 'unit_num' && !isString(val)) {
                return validationError(res, `"${field}" must be a string.`, field);
            }
            if (field === 'unit_num' && !isNum(val)) {
                return validationError(res, `"${field}" must be a number.`, field);
            }
            if (!isRequired(val) || typeof val === 'string' && !isTrimmed(val)) {
                return validationError(res, `"${field}" cannot be empty`, field);
            }
            if (field === 'email' && !isEmail(val)) {
                return validationError(res, 'Incorrect email format', field);
            }
            if (field === 'phone' && !isPhone(val)) {
                return validationError(res, 'Incorrect phone format', field);
            }
            if (field === 'unit_num' && !isUnitNum(val)) {
                return validationError(res, 'Invalid unit number', field);
            }
        }
        return next();
    }
};
