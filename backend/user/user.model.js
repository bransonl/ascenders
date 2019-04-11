const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');

function createUserObject({username, role, notificationEmail, phone}) {
    return {
        username,
        role,
        email: notificationEmail,
        phone,
    };
}

async function login(username, password) {
    if (!username || !password) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/login`,
        qs: {
            username,
            password,
        },
        headers: sharedHeaders,
        json: true,
    };
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function logout(sessionToken) {
    if (!sessionToken) {
        throw new ModelError(400, 'Missing session token');
    }
    const options = {
        method: 'POST',
        uri: `${apiEndpoint}/logout`,
        headers: {
            'X-Parse-Session-Token': sessionToken,
            ...sharedHeaders,
        },
        json: true,
    };
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function register(username, password, role, email) {
    if (!username || !password || !role || !email) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'POST',
        uri: `${apiEndpoint}/users`,
        headers: sharedHeaders,
        body: data,
        json: true,
    };
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getUserById(userId) {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users/${userId}`,
        headers: sharedHeaders,
        json: true,
    };
    try {
        const result = await request(options);
        console.log(result);
        return createUserObject(result);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    createUserObject,
    login,
    logout,
    register,
    getUserById,
}
