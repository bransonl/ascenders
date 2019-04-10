const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const ticketsClassPath = `${apiEndpoint}/classes/tickets`;

async function createTicket(title,body,creator,attachments) {
    if (!title || !body || !creator) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (creator.length != 10) {
        throw new ModelError(400, 'Invalid userId');
    }
    if (!attachments) {
        attachments = '';
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
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function getUserTickets(userId) {
    if (!userId) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (userId.length != 10) {
        throw new ModelError(400, 'Invalid userId');
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
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function getLabelTickets(labelType, labelId) {
    if (!labelType | !labelId) {
        throw new ModelError(400, 'missing fields');
    }
    console.log(`{"${labelType}":"${labelId}"}`);
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: `{"${labelType}":"${labelId}"}`,
        },
        header: sharedHeaders,
    };
    try {
        console.log(JSON.parse(await request(options)));
        return JSON.parse(await request(options)).results;
    } catch (err) {
        return new ModelError(err.statusCode, err.error.error);
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
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(400, 'Invalid ticketId');
    }
    const options = {
        method: 'GET',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
    }
    try {
        return JSON.parse(await request(options));
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyTicket(ticketId, data) {
    if (!ticketId || !data) {
        throw new ModelError(400,'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(400, 'Invalid ticketId');
    }
    const keys = Object.keys(data);
    for (i=0; i<keys.length; i++) {
        if (keys[i].length == 0) {
            throw new ModelError(400, 'Invalid key value');
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
        return request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

// changes ticket status to 'closed'
async function closeTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400,'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(400, 'Invalid ticketId');
    }
    const options = {
        method: 'PUT',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: {status: 'k8nQSGO3BN'} //labelId for 'closed'
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    createTicket,
    getUserTickets,
    getLabelTickets,
    getAllTickets,
    getTicket,
    modifyTicket,
    closeTicket,
}