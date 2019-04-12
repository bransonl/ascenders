const auth = require('../auth');
const {jwtSecret} = require('../env');
const userModel = require('./user.model');
const {UserController} = require('./user.controller');

const controller = new UserController([userModel], jwtSecret);

function routes(app) {
    app.route('/checkToken')
        .get(auth.validateToken, controller.checkToken);

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

    app.route('/users/admin')
        .get(
            auth.validateToken,
            auth.createRoleCheck('admin'),
            controller.getAdmins,
        )
}

module.exports = {
    routes,
}
