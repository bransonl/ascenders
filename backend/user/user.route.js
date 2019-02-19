let userController = require('./user.controller.js');

function routes(app) {
  app.route('/hello/:id')
    .get(userController.hello);
};

module.exports = {
  routes,
}
