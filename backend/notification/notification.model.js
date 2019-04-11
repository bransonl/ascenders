const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env');
const {ModelError} = require('../error');

const batchEndpoint = `${apiEndpoint}/batch`;
const notificationClassPath = `/classes/notifications`;
const notificationClassEndpoint = `${apiEndpoint}${notificationClassPath}`

async function createNotificationForUsers(userIds = [], title, body, navigateTo) {
    if (userIds.length === 0) {
        throw new ModelError(500, 'Invalid number of users for notification');
    }
    const options = {
        method: 'POST',
        uri: batchEndpoint,
        headers: sharedHeaders,
        json: true,
        body: {
            requests: userIds.map(userId => ({
                method: 'POST',
                path: notificationClassPath,
                body: {userId, title, body, navigateTo, read: false},
            })),
        },
    };
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function getNotificationsForUser(userId) {
    if (!userId) {
        throw new ModelError(400, 'Missing user');
    }
    const options = {
        method: 'GET',
        uri: notificationClassEndpoint,
        headers: sharedHeaders,
        json: true,
        qs: {where: {userId}},
    };
    try {
        const {results} = await request(options);
        return results;
    } catch (err) {
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function markNotificationAsRead(notificationId) {
    if (!notificationId) {
        throw new ModelError(400, 'Missing notification id');
    }
    const options = {
        method: 'PUT',
        uri: `${notificationClassEndpoint}/${notificationId}`,
        headers: sharedHeaders,
        json: true,
        body: {read: true},
    };
    try {
        await request(options);
        return true;
    } catch (err) {
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function deleteNotification(notificationId) {
    if (!notificationId) {
        throw new ModelError(400, 'Missing notification id');
    }
    const options = {
        method: 'DELETE',
        uri: `${notificationClassEndpoint}/${notificationId}`,
        headers: sharedHeaders,
        json: true,
    };
    try {
        await request(options);
        return true;
    } catch (err) {
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

module.exports = {
    createNotificationForUsers,
    getNotificationsForUser,
    markNotificationAsRead,
    deleteNotification,
}
