const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const userModel = require('../user/user.model');

const userPreferenceClassPath = `${apiEndpoint}/classes/userPreferences`;

const defaultNotificationPreferences = {
    notifyByEmail: true,
    notifyBySms: true,
}

function serializeUserPreference({
    objectId,
    username,
    email = undefined,
    phone = undefined,
    profilePhoto = undefined,
    notifyByEmail = true,
    notifyBySms = true,
}) {
    return {
        objectId,
        username,
        email,
        phone,
        profilePhoto,
        notifyByEmail,
        notifyBySms,
    };
}

async function getUserPreferenceForUser(username) {
    const options = {
        method: 'GET',
        uri: `${userPreferenceClassPath}`,
        headers: sharedHeaders,
        qs: {
            where: {username},
        },
        json: true,
    };
    try {
        const results = (await request(options)).results;
        if (results.length === 0) {
            const user = await userModel.getUserByUsername(username);
            const preferences = {};
            if (user.email) {
                preferences.email = user.email;
            }
            if (user.phone) {
                preferences.phone = user.phone;
            }
            await createUserPreferenceForUser(username, preferences);
            return serializeUserPreference((await request(options)).results[0]);
        }
        return serializeUserPreference(results[0]);
    } catch (err) {
        console.error(err);
        if (err.statusCode === 404) {
            throw err;
        }
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function createUserPreferenceForUser(username, data) {
    if (!username) {
        throw new ModelError(400, 'Missing username');
    }
    const serialized = serializeUserPreference({username, ...data});
    const options = {
        method: 'POST',
        uri: userPreferenceClassPath,
        headers: sharedHeaders,
        json: true,
        body: serialized,
    };
    try {
        return await request(options);
    } catch (err) {
        console.error(err.error)
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function updateUserPreferenceForUser(username, data) {
    if (!username) {
        throw new ModelError(400, 'Missing username');
    }
    try {
        const existing = await getUserPreferenceForUser(username);
        const serialized = serializeUserPreference({...existing, ...data, username});
        const options = {
            method: 'PUT',
            uri: `${userPreferenceClassPath}/${existing.objectId}`,
            headers: sharedHeaders,
            json: true,
            body: serialized,
        };
        return await request(options);
    } catch (err) {
        console.error(err);
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

module.exports = {
    serializeUserPreference,
    getUserPreferenceForUser,
    createUserPreferenceForUser,
    updateUserPreferenceForUser,
};
