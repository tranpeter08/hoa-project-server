"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;
exports.default = {
    isRequired(val) {
        return val === '' ? false : true;
    },
    isString(val) {
        return typeof val === 'string';
    },
    isNum(val) {
        return typeof val === 'number';
    },
    isTrimmed(val) {
        return typeof val === 'string' && val.trim() === val ? true : false;
    },
    hasLength(val, min, max = undefined) {
        return min && val.length < min ? false :
            max && val.length > max ? false : true;
    },
    notPassword(password) {
        return !/^(?=.*[a-z])/.test(password) ?
            'Password should contain at least one lowercase letter' :
            !/(?=.*[A-Z])/.test(password) ?
                'Password should contain at least one uppercase letter' :
                !/(?=.*[0-9])/.test(password) ?
                    'Password should contain at least one number' :
                    !/(?=.[!@#\$%\^&])/.test(password) ?
                        'Password should contain at least one special character' :
                        false;
    },
    isEmail(email) {
        let parts = email.split('@');
        if (parts.length === 2) {
            parts = parts[1].split('.');
        }
        if (parts.length >= 2) {
            return true;
        }
        return false;
    },
    isPhone(phone) {
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
    },
    isUnitNum(unit) {
        const units = [2011, 2013, 2015, 2017, 2019];
        return units.includes(unit);
    },
    validationError(res, message, location, code = 400) {
        return res.status(code).json({ message, location });
    }
};
