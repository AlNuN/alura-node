class UserDao {

  constructor(db) {
    this.db = db;
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `
          SELECT *
          FROM usuarios
          WHERE email = ?
        `,
        [email],
        (error, user) => error
          ? reject('Não foi possível encontrar o usuário!')
          : resolve(user)
      );
    });
  }
}

module.exports = UserDao;