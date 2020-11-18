const { resolve } = require("path");

class BookDao {
  constructor(db) {
    this.db = db;
  }

  add({titulo, preco, descricao}) {
    return new Promise((resolve, reject) => {
      this.db.run(`
        INSERT INTO livros (
          titulo,
          preco,
          descricao
        ) values (?,?,?)
      `, 
      [
        titulo,
        preco,
        descricao
      ],
      (err) => err 
        ? reject('It was not possible to add the book') 
        : resolve()
      );
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM livros',
        (err, result) => err 
          ? reject('It was not possible to load the books') 
          : resolve(result)
      );
    }); 
  }
}

module.exports = BookDao;