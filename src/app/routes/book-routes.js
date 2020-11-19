const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const Book = require('../models/book');

module.exports = (app) => {
  const bookRoutes = BookController.routes();

  app.get(bookRoutes.list, bookController.list());

  app.route(bookRoutes.add) 
    .get(bookController.form())
    .post(Book.validations(), bookController.add())
    .put(bookController.update());

  app.get(bookRoutes.edit, bookController.searchId());

  app.delete(bookRoutes.delete, bookController.delete());
}
