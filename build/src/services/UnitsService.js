"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    isVacant(knex, unit_num) {
        return knex
            .count('unit_num')
            .from('units')
            .where({ unit_num })
            .andWhere('resident_id', null)
            .then((row) => {
            return row[0].count;
        });
    }
};
