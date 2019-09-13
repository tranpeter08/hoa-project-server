module.exports = {
  PORT : process.env.PORT || '8080',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://staff:@localhost/hoa_project',
  DB_URL: process.env.DATABASE_URL_TEST || 'postgresql://staff:@localhost/hoa_project_test',
  JWT_SECRET: process.env.JWT_SECRET
  // add database
}