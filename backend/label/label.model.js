const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const labelsClassPath = `${apiEndpoint}/classes`;

async function getLabels(labelType) {
    if (!labelType) {
        return new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${labelsClassPath}/${labelType}`,
        headers: sharedHeaders,
    };
    try {
        const res = await request(options);
        return JSON.parse(res).results;
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function getLabel(labelType, name) {
    if (!labelType | !name) {
        return new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${labelsClassPath}/${labelType}`,
        qs: {
            where: `{"name":"${name}"}`,
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
async function createLabel(labelType, name) {
    if (!labelType | !name) {
        throw new ModelError(400,'Missing fields');
    }
    else if (labelType != 'tag') {
        throw new ModelError(400,'Wrong method');
    }
    const options = {
        method: 'POST',
        uri: `${labelsClassPath}/${labelType}`,
        headers: sharedHeaders,
        json: true,
        body: {
            name,
        }
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

// labels with colour (status, priority)
async function createLabelc(labelType, name, colour) {
    if (!labelType | !name | !colour) {
        return new ModelError(400, 'Missing fields');
    }
    else if (labelType != 'status' & labelType != 'priority'){
        throw new ModelError(400,'Wrong method');
    }
    else if (colour.length != 6) {
        return new ModelError(400, 'Invalid colour');
    }
    const options = {
        method: 'POST',
        uri: `${labelsClassPath}/${labelType}`,
        headers: sharedHeaders,
        json: true,
        body: {
            name,
            colour,
        },
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyLabel(labelType, labelId, name) {
    if (!labelType | !labelId | !name) {
        return new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${labelsClassPath}/${labelType}/${labelId}`,
        headers: sharedHeaders,
        json: true,
        body: {
            name,
        },
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyLabelc(labelType, labelId, name, colour) {
    if (!labelType | !labelId | !name | !colour) {
        return new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${labelsClassPath}/${labelType}/${labelId}`,
        headers: sharedHeaders,
        json: true,
        body: {
            name,
            colour,
        },
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    getLabels,
    getLabel,
    createLabel,
    createLabelc,
    modifyLabel,
    modifyLabelc,
}