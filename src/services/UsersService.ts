import {QueryInterface } from 'knex';
import bcrypt from 'bcryptjs';

interface User {
  username: string,
  password: string,
  is_admin: boolean
}

export default {
  async getUserLogin(knex: QueryInterface, user: User) {
    const {username, password} = user;
    const row =  await knex
      .select('*')
      .from('users')
      .where('username', username);

    const {password: hash, ...result} = row[0];
    const isValid = await bcrypt.compare(password, hash);

    if (isValid) {
      return result;
    }

    return false;
  },

  async createUser(knex: QueryInterface, user: User) {
    const row = await knex
      .insert(user)
      .into('users')
      .returning(['id', 'username', 'is_admin']);

      return row[0];
  },

  async getCount(knex: QueryInterface, column: string, value: any) {
    const row: any = await knex
      .count(column)
      .from('users')
      .where(column, value);

    return row[0].count;
  }
}