"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getUserLogin(knex, username, user_pw) {
        return knex
            .select('id', 'username')
            .from('users')
            .where({ username, user_pw })
            .then((row) => {
            return row[0];
        });
    },
    createUser(knex, user) {
        return knex
            .insert(user)
            .into('users')
            .returning('id');
    },
    getCount(knex, column, value) {
        return knex
            .count(column)
            .from('users')
            .where(column, value)
            .then((row) => {
            return row[0].count;
        });
    }
};
