module.exports = {
  getUserLogin(knex, username) {
    return knex
      .select('*')
      .from('users')
      .where('username', username)
  },

  createUser(knex, user) {
    return knex()
      .insert(user)
      .into('users')
      .returning('id');
  }
}