const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');

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

async function register(username, password, role) {
    if (!username || !password || !role) {
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

module.exports = {
    login,
    logout,
    register,
}
