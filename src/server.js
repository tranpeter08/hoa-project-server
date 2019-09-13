'use strict';
const app = require('./app');
const knex = require('knex');
const {PORT, DB_URL} = require('./config');
const passport = require('passport');
const {localStrat, jwtStrat} = require('./routes/auth/strategies');

const db = knex({
  client: 'pg',
  connection: DB_URL
});

console.log('Connected to database');

app.set('db', db);

passport.use(jwtStrat);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});

module.exports = {db};