const request = require('request-promise-native');

const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const messageClassPath = `${apiEndpoint}/classes/message`;

// Stores a message
async function createMessage(ticketId, type, sender, message) {
    const options = {
        method: 'POST',
        uri: messageClassPath,
        headers: sharedHeaders,
        body: {
            ticketId,
            sender,
            message,
        },
        json: true,
      };
    return await request(options);
}

async function getTicketMessages(ticketId, type) {
    const getTicketMessagesOptions = {
        method: 'GET',
        uri: `${apiEndpoint}/classes/ticketMessages`,
        headers: sharedHeaders,
        qs: {
            where: encodeURIComponent(JSON.stringify({
                ticketId,
                type,
            })),
        },
    }
    const {results} = await request(getTicketMessagesOptions);
    if (results.length > 1) { // Should only be one of any type for a ticket
        throw `More than one set of messages of type ${type} for ticket ${ticketId}`;
    } else if (results.length === 0) {
        return null;
    } else {
        return results[0];
    }
}

async function createTicketMessages(ticketId, type, messageIds = []) {
    const createTicketMessagesOptions = {
        method: 'POST',
        uri: `${apiEndpoint}/classes/ticketMessages`,
        headers: sharedHeaders,
        body: {ticketId, type, messageIds},
        json: true,
    }
    return await request(createTicketMessagesOptions);
}

async function addToTicketMessageIds(objectId, messageIds, messageId) {
    const updateTicketMessagesOptions = {
        method: 'PUT',
        uri: `${apiEndpoint}/classes/ticketMessages/${objectId}`,
        headers: sharedHeaders,
        body: {messageIds: messageIds.concat(messageId)},
        json: true,
    }
    return await request(updateTicketMessagesOptions);
}

module.exports = {
    createMessage,
    getTicketMessages,
    createTicketMessages,
    addToTicketMessageIds,
}