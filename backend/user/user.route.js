const auth = require('../auth.js');
const userController = require('./user.controller.js');

function routes(app) {
    app.route('/login')
        .post(userController.login);
    
    app.route('/logout')
        .post(auth.validateToken, userController.logout);
    
    app.route('/users')
        .post( // Register a user
            auth.validateToken,
            auth.createRoleCheck('admin'),
            userController.register,
        );
}
    
module.exports = {
    routes,
}