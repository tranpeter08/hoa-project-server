'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = require('./app'); done
// const knex = require('knex'); done
// const {PORT, DB_URL} = require('./config'); doine
const app_1 = __importDefault(require("./app"));
const knex_1 = __importDefault(require("knex"));
const config_1 = __importDefault(require("./config"));
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
module.exports = { db };
