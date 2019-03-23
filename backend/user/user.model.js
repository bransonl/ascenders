const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');

async function login(username, password) {
    if (!username || !password) {
        throw new Error('Missing fields');
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
    return await request(options);
}

async function logout(sessionToken) {
    if (!sessionToken) {
        throw new Error('Missing session token');
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
    return await request(options);
}

async function register(username, password, role) {
    if (!username || !password || !role) {
        throw  new Error('Missing fields');
    }
    const options = {
        method: 'POST',
        uri: `${apiEndpoint}/users`,
        headers: sharedHeaders,
        body: data,
        json: true,
    };
    return await request(options);
}

module.exports = {
    login,
    logout,
    register,
}
