const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');

function createUserObject({objectId, username, role, notificationEmail, phone}) {
    return {
        userId: objectId,
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
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function register(username, password, role) {
    const {username, password, role} = data;
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

async function getUserById(userId) {
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
        const user = await request(options);
        return createUserObject(user);
    } catch (err) {
        if (err.statusCode === 404) {
            throw new ModelError(404, `The user with id ${userId} does not exist`);
        }
        throw new ModelError(500, `Database call failed: ${err.error.error}`);
    }
}

async function getUserByUsername(username) {
    if (!username) {
        throw new ModelError(400, 'Missing username');
    }
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users`,
        headers: sharedHeaders,
        json: true,
        qs: {
            where: {
                username,
            },
        },
    };
    try {
        const results = (await request(options)).results;
        if (results.length === 0) {
            throw new ModelError(404, `The user with username ${username} does not exist`);
        }
        return createUserObject(results[0]);
    } catch (err) {
        if (err.statusCode === 404) {
            throw err;
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

async function getAllUsers() {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/users`,
        headers: sharedHeaders,
        json: true,
    };
    try {
        return (await request(options)).results.map(createUserObject);
    } catch (err) {
        throw new ModelError(500, `Database call failed ${err.error.error}`);
    }
}

module.exports = {
    createUserObject,
    login,
    logout,
    register,
    getUserById,
    getUserByUsername,
    getAdmins,
    getAllUsers,
}
