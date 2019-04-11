const {validateToken} = require('../auth');

class NotificationController {
    constructor(model, socket) {
        this._userSockets = {};
        this._ready = false;
        this._model = model;
        this._socket = socket;
        this._initNotificationSocket();

        this.getNotificationsForUser = this.getNotificationsForUser.bind(this);
        this.createNotificationForUsers = this.createNotificationForUsers.bind(this);
    }

    _initNotificationSocket() {
        if (this._ready) {
            return;
        }
        try {
            this._socket
                .of('/notifications')
                .on('connect', (socket) => {
                    // request and handle authentication and identification of user
                    socket.emit('auth', (token, ack) => {
                        try {
                            const user = validateToken(token);
                            this._userSockets[user.objectId] = socket;
                            ack({success: true});
                        } catch (err) {
                            ack({success: false});
                            socket.disconnect(true);
                        }
                    });

                    // handle read notification events
                    socket.on('read', async (notificationId, ack) => {
                        try {
                            await this._model.markNotificationAsRead(notificationId);
                            ack({success: true, notificationId});
                        } catch (err) {
                            ack({success: false});
                        }
                    });

                    // handle delete notification events
                    socket.on('delete', async (notificationId, ack) => {
                        try {
                            await this._model.deleteNotification(notificationId);
                            ack({success: true});
                        } catch (err) {
                            ack({success: false});
                        }
                    });

                    // handle get notification events
                    socket.on('get', async (userId, ack) => {
                        try {
                            const notifications = await this._model.getNotificationsForUser(userId);
                            ack({success: true, data: notifications});
                        } catch (err) {
                            ack({success: false});
                        }
                    });
                });

            this._ready = true;
        } catch (err) {}
    }

    async getNotificationsForUser(req, res) {
        const userId = req.user.objectId;
        if (!userId) {
            return res.status(400).json({
                message: 'Missing user id',
            });
        }
        try {
            const results = await this._model.getNotificationsForUser(userId);
            return res.json(results);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async createNotificationForUsers(userIds, title, body, navigateTo) {
        await this._model.createNotificationForUsers(users, title, body, navigateTo);
        userIds.forEach((userId) => {
            if (!this._userSockets[userId]) {
                return;
            }
            this._userSockets[userId].emit('new', {
                title, body, navigateTo,
            });
        });
    }
}

module.exports = {
    NotificationController,
}
