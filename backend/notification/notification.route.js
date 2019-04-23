const auth = require('../auth');
const socket = require('../socket').socket;
const {NotificationController} = require('./notification.controller');
const notificationModel = require('./notification.model');
const userPreferenceModel = require('../user-preference/user-preference.model');

notificationModel.init();
const controller = new NotificationController([notificationModel, userPreferenceModel], socket);

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
