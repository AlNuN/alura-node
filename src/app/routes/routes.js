const baseRoutes = require('./base-routes');
const bookRoutes = require('./book-routes');

module.exports = (app) => {
  baseRoutes(app);
  bookRoutes(app);
}
