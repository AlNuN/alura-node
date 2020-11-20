const BookDao = require('../infra/book-dao');
const db = require('../../config/database');
const { validationResult } = require('express-validator/check');
const templates = require('../views/templates');

class BookController {

  static routes() {
    return {
      authenticated: '/livros*',
      list: '/livros',
      add: '/livros/form',
      edit: '/livros/form/:id',
      delete: '/livros/:id',
    }
  }

  list () {
    return (req, resp) => {
    const bookDao = new BookDao(db);

    bookDao.list()
      .then((books) => resp.marko(
        templates.books.list,
        {  
          books
        }
      ))
      .catch(error => console.log(error));
    }
  }

  form() {
    return (req, resp) => {
      resp.marko(templates.books.form, { book: {}});
    }
  }

  searchId() {
    return (req, resp) => {
      const bookDao = new BookDao(db);
      const id = req.params.id;

      bookDao.searchId(id)
        .then((book) => resp.marko(
          templates.books.form,
          { book }
        ))
        .catch(error => console.log(error));
    }
  }

  add() {
    return (req, resp) => {
      console.log(req.body)
      const bookDao = new BookDao(db);

      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return resp.marko(
          templates.books.form,
          { 
            book: req.body,
            validationErrors: errors.array(),
          }
        );
      }

      bookDao.add(req.body)
        .then(resp.redirect(BookController.routes().list))
        .catch(error => console.log(error));
    }
  }

  update() {
    return (req, resp) => {
      console.log(req.body)
      const bookDao = new BookDao(db);

      bookDao.update(req.body)
        .then(resp.redirect(BookController.routes().list))
        .catch(error => console.log(error));
    }
  }

  delete() {
    return (req, resp) => {
      const id = req.params.id;
      const bookDao = new BookDao(db);

      bookDao.remove(id)
        .then(() => resp.status(200).end())
        .catch(error => console.log(error));
    }
  }

}

module.exports = BookController;