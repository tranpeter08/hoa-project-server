import { QueryInterface } from "knex";

interface Resident {
  email: string,
  phone: string,
  first_name: string,
  last_name: string,
  balance: number | undefined,
  user_id: number,
  unit: number
}

export default {
  createResident(knex: QueryInterface, data: Resident) {
    return knex
      .insert(data)
      .into('residents')
      .then(row => {
        console.log('ROW', row);
      });
  }
}