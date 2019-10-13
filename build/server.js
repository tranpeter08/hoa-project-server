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
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const knex_1 = __importDefault(require("knex"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
const { PORT, DB_URL } = config_1.default;
const db = knex_1.default({
    client: 'pg',
    connection: DB_URL
});
console.log('Connected to database');
app_1.default.set('db', db);
app_1.default.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
// FOR DEVELOPMENT ONLY
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.raw(`
      TRUNCATE TABLE users CASCADE;
      INSERT INTO units (unit_num) VALUES (2011), (2013), (2015), (2017), (2019);
    `);
    }
    catch (err) {
        console.log(err);
    }
}), 1000 * 60 * 20);
