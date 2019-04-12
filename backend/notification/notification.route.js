const auth = require('../auth');
const socket = require('../socket').socket;
const {NotificationController} = require('./notification.controller');
const notificationModel = require('./notification.model');
const userModel = require('../user/user.model');

notificationModel.init();
const controller = new NotificationController([notificationModel, userModel], socket);

function routes(app) {
    app.route('/notifications')
        .post(
            auth.validateTokenMiddleware,
            controller.removeLaterCreateNotificationForUsers,
        )
        .get(
            auth.validateTokenMiddleware,
            controller.getNotificationsForUser,
        );
}

module.exports = {
    controller,
    routes,
};
