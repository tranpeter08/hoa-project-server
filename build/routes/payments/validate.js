"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    paymentFields(req, res, next) {
        const expected = {
            amount: true,
            nonce: true,
            customerId: true
        };
        const keys = Object.keys(req.body);
        for (let key of keys) {
            if (!expected[key]) {
                return res.status(400).json({ message: 'Invalid field in request' });
            }
        }
        return next();
    }
};
