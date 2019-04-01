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

async function getUser(userId) {
    if (!userId) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users`,
        qs: {
            where: `{"objectId":"${userId}"}`,
        },
        headers: sharedHeaders,
    };
    try {
        console.log('getUser');
        console.log(JSON.parse(await request(options)).results[0]);
        return JSON.parse(await request(options)).results[0];
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getAdmins() {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users`,
        qs: {
            where: `{"role":"admin"}`,
        },
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    login,
    logout,
    register,
    getUser,
    getAdmins,
}
