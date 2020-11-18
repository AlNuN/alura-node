const express = require('express');
const routes = require('../app/routes/routes');

const app = express();

routes(app);

module.exports = app;
