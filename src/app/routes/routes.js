const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();

const Book = require('../models/book');

module.exports = (app) => {
  const baseRoutes = BaseController.routes();
  const bookRoutes = BookController.routes();

  app.get(baseRoutes.home, baseController.home());
  
  app.get(bookRoutes.list, bookController.list());
  
  app.get(bookRoutes.add, bookController.form());

  app.get(bookRoutes.edit, bookController.searchId());

  app.post(bookRoutes.list,
    Book.validations(),
    bookController.add()
  );

  app.put(bookRoutes.list, bookController.update());

  app.delete(bookRoutes.delete, bookController.delete());
}
