import { QueryInterface } from "knex";

export default {
  isVacant(knex: QueryInterface, unit_num: number) {
    return knex
      .count('unit_num')
      .from('units')
      .where({unit_num})
      .andWhere('resident_id', null)
      .then((row: any) => {
        return row[0].count;
      });
  }
} 