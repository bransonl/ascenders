const request = require('request-promise-native');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

const {
    apiEndpoint,
    sharedHeaders,
    sendgridApiKey,
    twilioAccountSid,
    twilioAuthToken,
    twilioPhoneNumber,
} = require('../env');
const {ModelError} = require('../error');

const batchEndpoint = `${apiEndpoint}/batch`;
const notificationClassPath = '/common/classes/notifications';
const notificationClassEndpoint = `${apiEndpoint}/classes/notifications`;

let twilioClient;

function init() {
    sgMail.setApiKey(sendgridApiKey);
    console.log('init sendgrid');
    twilioClient = twilio(twilioAccountSid, twilioAuthToken);
    console.log('init twilio');
}

async function createNotificationForUsers(userIds = [], title, body, navigateTo) {
    if (userIds.length === 0) {
        throw new ModelError(500, 'Invalid number of users for notification');
    }
    const results = {}; // record success/failures for each userId to return to caller
    userIds.forEach(async userId => {
        const options = {
            method: 'POST',
            uri: notificationClassEndpoint,
            headers: sharedHeaders,
            json: true,
            body: {
                userId,
                title,
                body,
                navigateTo,
                read: false,
            },
        };
        try {
            await request(options);
            results[userId] = {
                success: true,
            };
        } catch (err) {
            results[userId] = {
                success: false,
                error: err,
            };
        }
    });
    // for some reason batch isn't working???
    // const requests = userIds.map(userId => ({
    //     method: 'POST',
    //     path: notificationClassPath,
    //     body: {userId, title, body, navigateTo, read: false},
    // }));
    // console.log(requests);
    // const options = {
    //     method: 'POST',
    //     uri: batchEndpoint,
    //     headers: sharedHeaders,
    //     json: true,
    //     body: {
    //         requests,
    //     },
    // };
    // try {
    //     return await request(options);
    // } catch (err) {
    //     throw new ModelError(500, `Database call failed: ${err.statusCode}, ${err.error.error}`);
    // }
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
        throw new ModelError(500, `Database call failed: ${err.statusCode}, ${err.error.error}`);
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
        throw new ModelError(500, `Database call failed: ${err.statusCode}, ${err.error.error}`);
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
        throw new ModelError(500, `Database call failed: ${err.statusCode},  ${err.error.error}`);
    }
}

async function sendEmail(to, subject, body) {
    sgMail
        .send({
            to,
            from: 'test@test.com',
            subject,
            text: body,
            html: `<p>${body}<p>`,
        })
        .then(() => console.log(`sent email to ${to}`))
        .catch(err => {
            console.error(err);
            throw new ModelError(500, `Sendgrid failed to email to: ${to}`);
        });
}

async function sendSms(to, body) {
    twilioClient
        .messages
        .create({
            from: twilioPhoneNumber,
            to,
            body,
        })
        .then(() => console.log(`sent sms to ${to}`))
        .catch(err => {
            console.error(err);
            throw new ModelError(500, `Twilio failed to send SMS to ${to}`);
        });
}

module.exports = {
    init,
    createNotificationForUsers,
    getNotificationsForUser,
    markNotificationAsRead,
    deleteNotification,
    sendEmail,
    sendSms,
}
