'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const users_router_1 = __importDefault(require("./routes/users/users-router"));
const config_1 = __importDefault(require("./config"));
dotenv.config();
const { NODE_ENV } = config_1.default;
// const {jwtStrat} = require('./passport-strategies');
const app = express_1.default();
const morganFormat = NODE_ENV === 'production' ? 'tiny' : 'common';
const morganOptions = {
    skip: () => NODE_ENV === 'test'
};
const corsOptions = {
// cors options here
};
app.use(morgan_1.default(morganFormat, morganOptions));
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
// passport.use(jwtStrat);
// routes
app.use('/users', users_router_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    res.json({ message: req.body });
});
exports.default = app;
