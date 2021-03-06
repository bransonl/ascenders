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
                    console.log('notification socket connect');
                    // request and handle authentication and identification of user
                    socket.emit('auth', (token) => {
                        try {
                            const user = validateToken(token);
                            this._userSockets[user.username] = socket;
                            console.log('notification socket auth', user.username);
                        } catch (err) {
                            console.log(err);
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
                    socket.on('get', async (username, ack) => {
                        try {
                            const notifications = await this._model.getNotificationsForUser(username);
                            ack({success: true, data: notifications});
                        } catch (err) {
                            ack({success: false});
                        }
                    });
                });

            this._ready = true;
            console.log('init notification socket');
        } catch (err) {}
    }

    async getNotificationsForUser(req, res) {
        const username = req.user.username;
        if (!username) {
            return res.status(400).json({
                message: 'Missing user id',
            });
        }
        try {
            const notifications = await this._model.getNotificationsForUser(username);
            return res.json({
                notifications,
            });
        } catch (err) {
            return res.status(500).send();
        }
    }

    async createNotificationForUsers(usernames, title, body, navigateTo) {
        await this._model.createNotificationForUsers(usernames, title, body, navigateTo);
        usernames.forEach((username) => {
            if (this._userSockets[username]) {
                this._userSockets[username].emit('new', {
                    title, body, navigateTo,
                });
            }
        });
        usernames.forEach(async (username) => {
            try {
                const userPreference = await this._model.getUserPreferenceForUser(username);
                if (userPreference.email && userPreference.notifyByEmail) {
                    this._model.sendEmail(userPreference.email, title, body);
                }
                if (userPreference.phone && userPreference.notifyBySms) {
                    this._model.sendSms(userPreference.phone, body);
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
