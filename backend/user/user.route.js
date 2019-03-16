const userController = require('./user.controller.js');

function routes(app) {
  app.route('/login')
    .post(userController.login);

  app.route('/logout')
    .post(userController.logout);
};

module.exports = {
  routes,
}