const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const ticketsClassPath = `${apiEndpoint}/classes/tickets`;

async function createTicket(title,body,creator,attachments) {
    if (!title || !body || !creator || !attachments) {
        throw new ModelError(400, 'Missing fields');
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
            status: 'open',
        },
        json: true,
    }
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getTickets(userId) {
    if (!userId) {
        throw new Error(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: `{"creator":"${userId}"}`,
            // how to check for admin
        },
        headers: sharedHeaders,
    };
    try {
        return await request(options);
    } catch (err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
    }
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyTicket(ticketId,data) {
    if (!ticketId || !data) {
        throw new ModelError(400,'Missing fields');
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
        return new ModelError(err.statusCode, err.error.error);
    }
}

// changes ticket status to 'closed'
async function closeTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400,'Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: {status: 'closed'}
    };
    try {
        return await request(options);
    } catch(err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    modifyTicket,
    closeTicket,
}