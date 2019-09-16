import { QueryInterface } from "knex";

export default {
  // check if unit is taken
  getUnitId(knex: QueryInterface, unit_num: number) {
    // select id from units where unit_num = unit_num
    // select * from residents where unit_id = id
    // select count(id) from resdients where unit_id = (select (id) where unit_num = unit_num);
  },

  getUnitVacancy(knex: QueryInterface, unit_num: number) {
    const subQuery = knex
      .select('id')
      .from('units')
      .where({unit_num});

    return knex
      .count('id')
      .from('residents')
      .where('unit_id', 'in', subQuery)
      .then(row => {
        console.log(row);
      });
  }
} 