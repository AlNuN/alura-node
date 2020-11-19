const { check } = require('express-validator/check');

const BookController = require('../controllers/book-controller');
const bookController = new BookController();

const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();

module.exports = (app) => {
  app.get('/', baseController.home());
  
  app.get('/livros', bookController.list());
  
  app.get('/livros/form', bookController.form());

  app.get('/livros/form/:id', bookController.searchId());

  app.post('/livros',
    [
      check('titulo').isLength({min: 5}).withMessage('O título precisa ter no mínimo 5 caracteres'),
      check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
    ],
    bookController.add()
   );

  app.put('/livros', bookController.update());

  app.delete('/livros/:id', bookController.delete());
}
