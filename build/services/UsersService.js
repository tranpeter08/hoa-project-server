"use strict";
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = {
    getUserLogin(knex, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = user;
            const row = yield knex
                .select('*')
                .from('users')
                .where('username', username);
            if (!row.length)
                return false;
            const _a = row[0], { password: hash } = _a, result = __rest(_a, ["password"]);
            const isValid = yield bcryptjs_1.default.compare(password, hash);
            if (isValid)
                return result;
            return false;
        });
    },
    createUser(knex, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield knex
                .insert(user)
                .into('users')
                .returning(['id', 'username', 'is_admin']);
            return row[0];
        });
    },
    getCount(knex, column, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield knex
                .count(column)
                .from('users')
                .where(column, value);
            return row[0].count;
        });
    }
};
