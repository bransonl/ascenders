const auth = require('../auth');
const {jwtSecret} = require('../env');
const userModel = require('./user.model');
const {UserController} = require('./user.controller');

const controller = new UserController([userModel], jwtSecret);

function routes(app) {
    app.route('/checkToken')
        .get(
            auth.validateTokenMiddleware,
            controller.checkToken,
        );

    app.route('/login')
        .post(controller.login);

    app.route('/logout')
        .post(
            auth.validateTokenMiddleware,
            controller.logout,
        );

    app.route('/users')
        .get( // Get all the users
            auth.validateTokenMiddleware,
            auth.createRoleCheck('admin'),
            controller.getAllUsers,
        )
        .post( // Register a user
            auth.validateTokenMiddleware,
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
