const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserDao = require('../app/infra/user-dao');
const db = require('./database');

module.exports = (app) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha',   
    },
    (email, password, done) => {
      const userDao = new UserDao(db);
      userDao.findByEmail(email)
        .then((user) =>  (!user || user.senha != password) 
          ? done(null, false, { mensagem: 'Login e senha incorretos.'})
          : done(null, user)
        )
        .catch((error) => done(error, false));
    }
  ));

  passport.serializeUser((user, done) => {
    const userSession = {
      nome: user.nome_completo,
      email: user.email,
    };
    done(null, userSession);
  });

  passport.deserializeUser((userSession, done) => {
    done(null, userSession);
  });

  app.use(session({
    secret: 'node alura',
    genid: (req) => uuid(),
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, resp, next) => {
    req.passport = passport;
    next();
  });
};
