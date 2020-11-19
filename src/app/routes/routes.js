const BookDao = require('../infra/book-dao');
const db = require('../../config/database');

module.exports = (app) => {
  app.get('/', (req, resp) => {
    resp.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h1>Casa do Código<h1>
      </body>
      </html>
    `);
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

  app.post('/livros', (req, resp) => {
    console.log(req.body)
    const bookDao = new BookDao(db);

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
