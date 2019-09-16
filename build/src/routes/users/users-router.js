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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const UsersService_1 = __importDefault(require("../../services/UsersService"));
const validate_1 = __importDefault(require("./validate"));
const validators_1 = __importDefault(require("../validators"));
const usersRouter = express_1.Router();
const { JWT_EXPIRY, JWT_SECRET } = config_1.default;
const { sendError } = validators_1.default;
usersRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = req.app.get('db');
    const { username, password } = req.body;
    // validate entry
    // check if username, or email is taken
    // insert into users
    // check if resident, add resident info
    try {
        const [{ count: users }] = yield UsersService_1.default.getCount(db, 'username', username);
        if (users) {
            return sendError(res, 400, 'Account already exists with that username.', 'username');
        }
        const [{ count: emails }] = yield UsersService_1.default.getCount(db, 'username', username);
        if (emails) {
            return sendError(res, 400, 'Account already exists with that email.', 'email');
        }
        res.status(200).json({ message: 'ok' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'ok' });
    }
}));
usersRouter.post('/login', validate_1.default.login, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const user_pw = bcryptjs_1.default.hashSync(password, 10);
    try {
        const user = yield UsersService_1.default.getUserLogin(db, username, user_pw);
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
        console.log(err);
        res.status(500).json(err);
    }
}));
exports.default = usersRouter;
