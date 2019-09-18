"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    createResident(knex, data) {
        return knex
            .insert(data)
            .into('residents')
            .then(row => {
            console.log('ROW', row);
        });
    },
    hasEmail(knex, email) {
        return knex
            .count('id')
            .from('residents')
            .where({ email })
            .then((rows) => rows[0].count);
    }
};
