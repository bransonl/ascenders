const {ModelError} = require('../error');

async function getLabels(labelType) {
    let response;
    if (!labelType) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    else if (labelType == 'tag') {
        response = `{
            "results": [
                {
                    "objectId": "S9Zo7fsQfI",
                    "name": "bug report",
                    "createdAt": "2019-04-01T12:22:24.259Z",
                    "updatedAt": "2019-04-01T12:22:24.259Z"
                },
                {
                    "objectId": "e41L8DGXfF",
                    "name": "feedback",
                    "createdAt": "2019-04-01T12:24:15.222Z",
                    "updatedAt": "2019-04-01T12:24:15.222Z"
                }
            ]
        }`
    }
    else if (labelType == 'status') {
        response = `{
            "results": [
                {
                    "objectId": "e0WoclRcZV",
                    "name": "open",
                    "colour": "#40E0D0",
                    "createdAt": "2019-04-01T12:51:31.438Z",
                    "updatedAt": "2019-04-01T12:51:31.438Z"
                },
                {
                    "objectId": "k8nQSGO3BN",
                    "name": "closed",
                    "colour": "#D3D3D3",
                    "createdAt": "2019-04-01T13:06:03.412Z",
                    "updatedAt": "2019-04-01T13:06:03.412Z"
                },
                {
                    "objectId": "mxOX02JJCH",
                    "name": "in-progress",
                    "colour": "#C7EA46",
                    "createdAt": "2019-04-01T13:25:44.186Z",
                    "updatedAt": "2019-04-01T13:53:11.778Z"
                }
            ]
        }`
    }
    else {
        response = `{
            "results": [
                {
                    "objectId": "72H9e0c19v",
                    "name": "urgent",
                    "colour": "#ED4337",
                    "createdAt": "2019-04-05T02:18:39.401Z",
                    "updatedAt": "2019-04-05T02:18:39.401Z"
                }
            ]
        }`
    }
    return Promise.resolve(JSON.parse(response).results);
}

async function getLabel(labelType, name) {
    if (!labelType | !name) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    let response;
    if (labelType=='tag' & name=='bug report') {
        response = `{
            "results": [
                {
                    "objectId": "S9Zo7fsQfI",
                    "name": "bug report",
                    "createdAt": "2019-04-01T12:22:24.259Z",
                    "updatedAt": "2019-04-01T12:22:24.259Z"
                }
            ]
        }`
    }
    else if (labelType=='tag' & name!='bug report') {
        response = `{
            "results": []
        }`
    }
    return Promise.resolve(JSON.parse(response).results);
}

// labels without colour (tag)
async function createLabel(labelType, name) {
    if (!labelType | !name) {
        throw new ModelError(500,'Missing fields');
    }
    else if (labelType != 'tag') {
        throw new ModelError(500,'Invalid labelType');
    }
    const response = `{
        "objectId": "S9Zo7fsQfI",
        "createdAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
}

// labels with colour (status, priority)
async function createLabelc(labelType, name, colour) {
    if (!labelType | !name | !colour) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (labelType != 'status' & labelType != 'priority') {
        throw new ModelError(400, 'Invalid labelType');
    }
    else if (colour.length != 7 | colour[0] != '#') {
        throw new ModelError(400, 'Invalid colour');
    }
    const response = `{
        "objectId": "S9Zo7fsQfI",
        "createdAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
}


async function modifyLabel(labelType, labelId, name) {
    if (!labelType | !labelId | !name) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType != 'tag') {
        throw new ModelError(500, 'Invalid labelType');
    }
    if (labelId == 'fakedId') {
        throw new ModelError(404, 'Object not found');
    }
    const response = `{
        "updatedAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
}

async function modifyLabelc(labelType, labelId, name, colour) {
    if (!labelType | !labelId | !name | !colour) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType != 'status' & labelType != 'priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    else if (colour.length != 7 | colour[0] != '#') {
        throw new ModelError(500, 'Invalid colour');
    }
    if (labelId.length == 'fakeId') {
        throw new ModelError(404, 'Object not found');
    }
    const response = `{
        "updatedAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
}

module.exports = {
    getLabels,
    getLabel,
    createLabel,
    createLabelc,
    modifyLabel,
    modifyLabelc,
}