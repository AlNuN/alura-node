const { check } = require('express-validator/check');

const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();

module.exports = (app) => {
  const baseRoutes = BaseController.routes();
  const bookRoutes = BookController.routes();

  app.get(baseRoutes.home, baseController.home());
  
  app.get(bookRoutes.list, bookController.list());
  
  app.get(bookRoutes.add, bookController.form());

  app.get(bookRoutes.edit, bookController.searchId());

  app.post(bookRoutes.list,
    [
      check('titulo').isLength({min: 5}).withMessage('O título precisa ter no mínimo 5 caracteres'),
      check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ],
    bookController.add()
   );

  app.put(bookRoutes.list, bookController.update());

  app.delete(bookRoutes.delete, bookController.delete());
}
