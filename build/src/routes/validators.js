"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isRequired(val) {
        return val === '' ? false : true;
    },
    isTrimmed(val) {
        return val.trim() === val ? true : false;
    },
    hasLength(val, min, max = undefined) {
        return min && val.length < min ? false :
            max && val.length > max ? false : true;
    },
    wrongFormat(password) {
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
    sendError(res, status = 400, message, location) {
        return res.status(status).json({ message, location });
    }
};
