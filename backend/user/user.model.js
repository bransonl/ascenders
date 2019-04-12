const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');

function createUserObject({objectId, username, role, phone}) {
    return {
        userId: objectId,
        username,
        role,
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
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
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
        throw new ModelError(500, `Database call failed ${err.error.error}`);
    }
}

async function getUser(userId) {
    if (!userId) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users/${userId}`,
        headers: sharedHeaders,
        json: true,
    };
    try {
        return await request(options);
    } catch (err) {
        if (err.statusCode === 404) {
            throw new ModelError(404, `The user with id ${userId} does not exist`);
        }
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function getAdmins() {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users`,
        qs: {
            where: {
                role: 'admin',
            },
        },
        headers: sharedHeaders,
        json: true,
    };
    try {
        return (await request(options)).results;
    } catch (err) {
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

module.exports = {
    createUserObject,
    login,
    logout,
    register,
    getUser,
    getAdmins,
}
