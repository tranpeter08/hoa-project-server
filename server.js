'use strict';
const app = require('./app');
const {PORT} = require('./config');

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});