const auth = require('../auth');
const socket = require('../socket').socket;
const {NotificationController} = require('./notification.controller');
const notificationModel = require('./notification.model');

const controller = new NotificationController(notificationModel, socket);

function routes(app) {
    app.route('/notifications')
        .get(
            auth.validateTokenMiddleware,
            controller.getNotificationsForUser,
        );
}

module.exports = {
    routes,
};
