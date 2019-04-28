const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const labelsClassPath = `${apiEndpoint}/classes`;

async function getLabels(labelType) {
    if (!labelType) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
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
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getLabel(labelType, name) {
    if (!labelType | !name) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
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
        return JSON.parse(await request(options)).results;
    } catch(err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

// labels without colour (tag)
async function createLabel(labelType, name) {
    if (!labelType | !name) {
        throw new ModelError(500,'Missing fields');
    }
    else if (labelType != 'tag') {
        throw new ModelError(500,'Invalid labelType');
    }
    const options = {
        method: 'POST',
        uri: `${labelsClassPath}/${labelType}`,
        headers: sharedHeaders,
        json: true,
        body: {
            name,
            labelType,
        }
    };
    try {
        return await request(options);
    } catch(err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

// labels with colour (status, priority)
async function createLabelc(labelType, name, colour) {
    if (!labelType | !name | !colour) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType != 'status' & labelType != 'priority'){
        throw new ModelError(500,'Invalid labelType');
    }
    else if (colour.length != 7 | colour[0] != '#') {
        throw new ModelError(500, 'Invalid colour');
    }
    const options = {
        method: 'POST',
        uri: `${labelsClassPath}/${labelType}`,
        headers: sharedHeaders,
        json: true,
        body: {
            name,
            colour,
            labelType,
        },
    };
    try {
        return await request(options);
    } catch(err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyLabel(labelType, labelId, name) {
    if (!labelType | !labelId | !name) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType != 'tag') {
        throw new ModelError(500, 'Invalid labelType');
    }
    else if (labelId.length != 10) {
        throw new ModelError(500, 'Invalid labelId');
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
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyLabelc(labelType, labelId, name, colour) {
    if (!labelType | !labelId | !name | !colour) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType != 'status' & labelType != 'priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    else if (labelId.length != 10) {
        throw new ModelError(500, 'Invalid labelId');
    }
    else if (colour.length != 7 | colour[0] != '#') {
        throw new ModelError(500, 'Invalid colour');
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
        throw new ModelError(err.statusCode, err.error.error);
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