'use strict';

// const app = require('./app'); done
// const knex = require('knex'); done
// const {PORT, DB_URL} = require('./config'); doine
import dotenv from 'dotenv';
import app from './app';
import knex from 'knex';
import config from './config';

dotenv.config();
const {PORT, DB_URL} = config;

const db = knex({
  client: 'pg',
  connection: DB_URL
});

console.log('Connected to database');

app.set('db', db);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});



setInterval(
  () => {
    db('users').truncate();
    console.log('truncate users');
  },
  1000 * 60 * 10
)


module.exports = {db};