require('marko/node-require').install();
require('marko/express');

const express = require('express');
const routes = require('../app/routes/routes');
const bodyParser = require('body-parser');

const app = express();

app.use('*', bodyParser.urlencoded({
  extended: true,
}));

routes(app);

module.exports = app;
