'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const validate_1 = __importDefault(require("./validate"));
const validators_1 = __importDefault(require("../validators"));
const UsersService_1 = __importDefault(require("../../services/UsersService"));
const ResidentsService_1 = __importDefault(require("../../services/ResidentsService"));
const UnitsService_1 = __importDefault(require("../../services/UnitsService"));
const usersRouter = express_1.Router();
const { JWT_EXPIRY, JWT_SECRET } = config_1.default;
const { isLogin, isUser, isResident } = validate_1.default;
const { validationError } = validators_1.default;
usersRouter.post('/register', isUser, isResident, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const db = req.app.get('db');
    const _a = req.body, { username, password, is_admin, unit_num } = _a, resident = __rest(_a, ["username", "password", "is_admin", "unit_num"]);
    try {
        const hasUser = yield UsersService_1.default.getCount(db, 'username', username);
        if (hasUser) {
            return validationError(res, 'Account already exists with that username', 'username');
        }
        const hasEmail = yield ResidentsService_1.default.hasEmail(db, resident.email);
        if (hasEmail) {
            return validationError(res, 'Account already exists with that email', 'email');
        }
        const isVacant = yield UnitsService_1.default.isVacant(db, unit_num);
        if (!isVacant) {
            return validationError(res, 'Account already exists for this unit', 'unit_num');
        }
        const newUser = yield db.transaction(function (trx) {
            return __awaiter(this, void 0, void 0, function* () {
                const hash = yield bcryptjs_1.default.hash(password, 10);
                const user = yield UsersService_1.default.createUser(trx, { username, password: hash, is_admin });
                resident.user_id = user.id;
                const resident_id = yield ResidentsService_1.default.createResident(trx, resident);
                yield UnitsService_1.default.addResident(trx, unit_num, resident_id);
                return user;
            });
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        return next(error);
    }
}));
usersRouter.post('/login', isLogin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const db = req.app.get('db');
    console.log('req body:', req.body);
    try {
        const user = yield UsersService_1.default.getUserLogin(db, req.body);
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Incorrect username or password.' });
        }
        const jwtOpts = {
            algorithm: 'HS256',
            expiresIn: JWT_EXPIRY,
        };
        const authToken = jsonwebtoken_1.default.sign(user, JWT_SECRET, jwtOpts);
        res.status(200).json({ authToken });
    }
    catch (err) {
        return next(err);
    }
}));
exports.default = usersRouter;
