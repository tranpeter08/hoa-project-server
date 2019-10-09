"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const braintree_1 = __importStar(require("braintree"));
const validate_1 = __importDefault(require("./validate"));
const config_1 = __importDefault(require("../../config"));
const router = express_1.default.Router();
const gatewayConfig = {
    environment: braintree_1.default.Environment.Sandbox,
    merchantId: config_1.default.BRAINTREE_MERCHANT_ID,
    publicKey: config_1.default.BRAINTREE_PUBLIC_KEY,
    privateKey: config_1.default.BRAINTREE_PRIVATE_KEY
};
const gateway = new braintree_1.BraintreeGateway(gatewayConfig);
router.get('/client_token', (req, res, next) => {
    gateway.clientToken.generate({})
        .then((resp) => {
        if (!resp.success) {
            return res.status(400).json({ message: resp.message });
        }
        return res.status(200).json({ clientToken: resp.clientToken });
    })
        .catch((error) => {
        return next(error);
    });
});
router.post('/', validate_1.default.paymentFields, (req, res, next) => {
    const { amount, customerId, nonce } = req.body;
    const transReq = {
        amount,
        paymentMethodNonce: nonce,
        customerId,
        options: {
            submitForSettlement: true,
            storeInVaultOnSuccess: true
        }
    };
    gateway.transaction.sale(transReq)
        .then((resp) => {
        if (!resp.success) {
            return res.status(400).json({ message: resp.message });
        }
        ;
        return res.status(200).json(resp);
    })
        .catch((err) => {
        res.status(500).json({ message: err.message });
    });
});
exports.default = router;
