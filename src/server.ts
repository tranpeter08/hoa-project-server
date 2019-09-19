'use strict';
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

// FOR DEVELOPMENT ONLY
setInterval(async () => {
  try {
    await db.raw(`
      TRUNCATE TABLE users CASCADE;
      INSERT INTO units (unit_num) VALUES (2011), (2013), (2015), (2017), (2019);
    `);
  } catch (err) {
    console.log(err);
  }
}, 1000 * 60 * 60);