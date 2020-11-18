class BookDao {
  constructor(db) {
    this.db = db;
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