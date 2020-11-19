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

  searchId(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`
        SELECT *
        FROM livros
        WHERE id = ?
      `,
      [id],
      (err, result) => err 
        ? reject('It was not possible to load the book') 
        : resolve(result)
      )
    })
  }

  update({titulo, preco, descricao, id}) {
    return new Promise((resolve, reject) => {
      this.db.run(`
        UPDATE livros SET
        titulo = ?,
        preco = ?,
        descricao = ?
        WHERE id = ?
      `, 
      [
        titulo,
        preco,
        descricao,
        id,
      ],
      (err) => err 
        ? reject('It was not possible to update the book') 
        : resolve()
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`
        DELETE FROM livros
        WHERE id = ?
      `, 
      [id],
      (err) => err 
        ? reject('It was not possible to delete the book') 
        : resolve()
      );
    });
  }
}

module.exports = BookDao;