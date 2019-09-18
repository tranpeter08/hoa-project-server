import { QueryInterface } from "knex";

interface Resident {
  email: string,
  phone: string,
  first_name: string,
  last_name: string,
  balance: number | undefined,
  user_id: number
}

export default {
  async createResident(knex: QueryInterface, data: Resident) {
    const row = await knex
      .insert(data, 'id')
      .into('residents');
    
      console.log(row);
      return row[0];
  },

  hasEmail(knex: QueryInterface, email: string) {
    return knex
      .count('id')
      .from('residents')
      .where({email})
      .then((rows: any) => rows[0].count);
  }
}