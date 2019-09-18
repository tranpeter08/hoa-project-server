import {QueryInterface } from 'knex';

interface User {
  username: string,
  password: string
}

export default {
  getUserLogin(knex: QueryInterface, username: string, user_pw: string) {
    return knex
      .select('id', 'username')
      .from('users')
      .where({username, user_pw})
      .then((row: any) => {
        return row[0];
      });
  },

  createUser(knex: QueryInterface, user: User) {
    return knex
      .insert(user)
      .into('users')
      .returning('id');
  },

  getCount(knex: QueryInterface,column: string, value: any) {
    return knex
      .count(column)
      .from('users')
      .where(column, value)
      .then((row: any) => {
        return row[0].count;
      });
  }
}