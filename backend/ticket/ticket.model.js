const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const ticketsClassPath = `${apiEndpoint}/classes/tickets`;

async function createTicket(title,body,creator,attachments) {
    if (!title | !body | !creator) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (creator.length != 10) {
        throw new ModelError(500, 'Invalid userId');
    }
    const options = { // header of API request to ACNAPI
        method: 'POST',
        uri: ticketsClassPath,
        headers: sharedHeaders,
        body: {
            title,
            body,
            creator,
            attachments,
            status: 'e0WoclRcZV', //labelId for open
        },
        json: true,
    }
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getUserTickets(userId) {
    if (!userId) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (userId.length != 10) {
        throw new ModelError(500, 'Invalid userId');
    }
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: `{"creator":"${userId}"}`,
        },
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getLabelTickets(labelType, labelId) {
    if (!labelType | !labelId) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    else if (labelId.length != 10) {
        throw new ModelError(500, 'Invalid labelId');
    }
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: `{"${labelType}":"${labelId}"}`,
        },
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getAllTickets() {
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(500, 'Invalid ticketId');
    }
    const options = {
        method: 'GET',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
    }
    try {
        return JSON.parse(await request(options));
    } catch(err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyTicket(ticketId, data) {
    if (!ticketId | !data) {
        throw new ModelError(500,'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(500, 'Invalid ticketId');
    }
    const keys = Object.keys(data);
    for (i=0; i<keys.length; i++) {
        if (keys[i].length == 0) {
            throw new ModelError(500, 'Invalid key value');
        }
    }
    const options = {
        method: 'PUT', 
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: data,
    };
    try {
        return await request(options);
    } catch(err) {
        console.log(err);
        throw new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    createTicket,
    getUserTickets,
    getLabelTickets,
    getAllTickets,
    getTicket,
    modifyTicket,
}