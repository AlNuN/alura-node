require('marko/node-require').install();
require('marko/express');

const sessionAuth = require('./session-auth');
const express = require('express');
const routes = require('../app/routes/routes');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const templates = require('../app/views/templates');

const app = express();

app.use('/static', express.static('src/app/public'));

app.use('*', bodyParser.urlencoded({
  extended: true,
}));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

sessionAuth(app);

routes(app);

app.use((req, resp, next) => resp.status(404).marko(
  templates.base.error404
));

app.use((error, req, resp, next) => resp.status(500).marko(
  templates.base.error500
));

module.exports = app;
