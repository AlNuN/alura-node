const passport = require('passport');
const templates = require('../views/templates');
const BookController = require('./book-controller');

class BaseController {
  static routes() {
    return {
      home: '/',
      login: '/login',
    }
  }

  home() {
    return (req, resp) => {
      resp.marko(templates.base.home);
    }
  }

  login() {
    return (req, resp) => {
      resp.marko(templates.base.login);
    }
  }

  signIn() {
    return (req, resp, next) => {
      const passport = req.passport;
      passport.authenticate('local', (error, user, info) => {
        if (info) return resp.marko(templates.base.login);
        if (error) return next(error);
        req.login(user, (error) => error
          ? next(error)
          : resp.redirect(BookController.routes().list)
        );
      })(req, resp, next);
    };
  }
}

module.exports = BaseController;
