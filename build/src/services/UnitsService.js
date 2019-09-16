"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // check if unit is taken
    getUnitId(knex, unit_num) {
        // select id from units where unit_num = unit_num
        // select * from residents where unit_id = id
        // select count(id) from resdients where unit_id = (select (id) where unit_num = unit_num);
    },
    getUnitVacancy(knex, unit_num) {
        const subQuery = knex
            .select('id')
            .from('units')
            .where({ unit_num });
        return knex
            .count('id')
            .from('residents')
            .where('unit_id', 'in', subQuery)
            .then(row => {
            console.log(row);
        });
    }
};
