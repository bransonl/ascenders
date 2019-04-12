const {validateToken} = require('../auth');

class NotificationController {
    constructor(models, socket) {
        this._userSockets = {};
        this._ready = false;
        this._model = Object.assign({}, ...models);
        this._socket = socket;
        this._initNotificationSocket();

        this.getNotificationsForUser = this.getNotificationsForUser.bind(this);
        this.createNotificationForUsers = this.createNotificationForUsers.bind(this);
        this.removeLaterCreateNotificationForUsers = this.removeLaterCreateNotificationForUsers.bind(this);
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
            const notifications = await this._model.getNotificationsForUser(userId);
            return res.json({
                notifications,
            });
        } catch (err) {
            return res.status(500).send();
        }
    }

    async createNotificationForUsers(userIds, title, body, navigateTo) {
        await this._model.createNotificationForUsers(userIds, title, body, navigateTo);
        userIds.forEach((userId) => {
            if (!this._userSockets[userId]) {
                return;
            }
            this._userSockets[userId].emit('new', {
                title, body, navigateTo,
            });
        });
        userIds.forEach(async (userId) => {
            try {
                const user = await this._model.getUser(userId);
                if (user.email) {
                    this._model.sendEmail(user.email, title, body);
                }
                if (user.phone) {
                    this._model.sendSms(user.phone, body);
                }
            } catch (err) {
                throw err;
            }
        });
    }

    async removeLaterCreateNotificationForUsers(req, res) {
        const {users, title, body, navigateTo} = req.body;
        try {
            await this.createNotificationForUsers(users, title, body, navigateTo);
            return res.status(200).send();
        } catch (err) {
            return res.status(500).json({
                error: err,
            });
        }
    }
}

module.exports = {
    NotificationController,
}
