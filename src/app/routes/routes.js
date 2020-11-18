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
}
