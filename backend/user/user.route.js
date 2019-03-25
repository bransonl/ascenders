const auth = require('../auth');
const {jwtSecret} = require('../env');
const userModel = require('./user.model');
const {UserController} = require('./user.controller');

const controller = new UserController(userModel, jwtSecret);

function routes(app) {
    app.route('/login')
        .post(controller.login);

    app.route('/logout')
        .post(auth.validateToken, controller.logout);

    app.route('/users')
        .post( // Register a user
            auth.validateToken,
            auth.createRoleCheck('admin'),
            controller.register,
        );
}

module.exports = {
    routes,
}
