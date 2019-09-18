import { QueryInterface } from "knex";

export default {
  async isVacant(knex: QueryInterface, unit_num: number) {
    const row: any = await knex
      .count('unit_num')
      .from('units')
      .where({unit_num})
      .andWhere('resident_id', null);

    return row[0].count;
  },

  async addResident(
    knex: QueryInterface, 
    unit_num: number,
    resident_id: number
    ) {
      const row = await knex
        .update({resident_id})
        .from('units')
        .where({unit_num});

      return row;
  }
}