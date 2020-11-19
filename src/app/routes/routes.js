const BookDao = require('../infra/book-dao');
const db = require('../../config/database');
const { check, validationResult } = require('express-validator/check');

module.exports = (app) => {
  app.get('/', (req, resp) => {
    resp.marko(require('../views/base/home/home.marko'));
  });
  
  app.get('/livros', (req, resp) => {
    const bookDao = new BookDao(db);

    bookDao.list()
      .then((books) => resp.marko(
        require('../views/livros/lista/lista.marko'),
        {  
          books
        }
      ))
      .catch(error => console.log(error));
  });
  
  app.get('/livros/form', (req, resp) => {
    resp.marko(require('../views/livros/form/form.marko'), { book: {}});
  });

  app.get('/livros/form/:id', (req, resp) => {
    const bookDao = new BookDao(db);
    const id = req.params.id;

    bookDao.searchId(id)
      .then((book) => resp.marko(
        require('../views/livros/form/form.marko'),
        { book }
      ))
      .catch(error => console.log(error));
  });

  app.post('/livros', [
    check('titulo').isLength({min: 5}).withMessage('O título precisa ter no mínimo 5 caracteres'),
    check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
  ],
   (req, resp) => {
    console.log(req.body)
    const bookDao = new BookDao(db);

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return resp.marko(
        require('../views/livros/form/form.marko'),
        { 
          book: req.body,
          validationErrors: errors.array(),
        }
      );
    }

    bookDao.add(req.body)
      .then(resp.redirect('/livros'))
      .catch(error => console.log(error));
  });

  app.put('/livros', (req, resp) => {
    console.log(req.body)
    const bookDao = new BookDao(db);

    bookDao.update(req.body)
      .then(resp.redirect('/livros'))
      .catch(error => console.log(error));
  });

  app.delete('/livros/:id', (req, resp) => {
    const id = req.params.id;
    const bookDao = new BookDao(db);

    bookDao.remove(id)
      .then(() => resp.status(200).end())
      .catch(error => console.log(error));
  });
}
