module.exports = {
  PORT : process.env.PORT || '8080',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL || 'postgresql://staff:@localhost/hoa_project'
  // add database
}