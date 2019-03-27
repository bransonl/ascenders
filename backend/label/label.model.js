const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const labelsClassPath = `${apiEndpoint}/classes/labels`;

async function getLabel(labelType) {
    if (!labelType) {
        return new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: labelsClassPath,
        qs: {
            where: `{"labelType":"${labelType}"}`,
        },
        headers: sharedHeaders,
    };
    try {
        const res = await request(options);
        return JSON.parse(res).results[0];
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

// labels without colour (tag)
async function createLabel(labelId, name) {
    if (!labelId | !name) {
        throw new ModelError(400,'Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${labelsClassPath}/${labelId}`,
        headers: sharedHeaders,
        json: true,
        body: {
            [name]: null,
        }
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

// labels with colour (status, priority)
async function createLabelc(labelId, name, colour) {
    if (!labelId | !name | !colour) {
        return new ModelError(400, 'Missing fields');
    }
    if (colour.length != 6) {
        return new ModelError(400, 'Invalid colour');
    }
    const options = {
        method: 'PUT',
        uri: `${labelsClassPath}/${labelId}`,
        headers: sharedHeaders,
        json: true,
        body: {
            [name]: colour,
        },
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    getLabel,
    createLabel,
    createLabelc,
}