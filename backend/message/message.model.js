const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const messageClassPath = `${apiEndpoint}/classes/message`;
const ticketMessagesClassPath = `${apiEndpoint}/classes/ticketMessages`;

const MessageTypes = Object.freeze({
    COMMENT: 'comment',
    CHAT: 'chat',
});

// Stores a message
async function createMessage(ticketId, sender, message) {
    if (!ticketId || !sender || !message) {
        throw new Error('Missing fields');
    }
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

async function getMessageIdsByTicketAndType(ticketId, type) {
    if (!ticketId || !type) {
        throw new Error('Missing fields');
    }
    const options = {
        method: 'GET',
        uri: ticketMessagesClassPath,
        headers: sharedHeaders,
        qs: {where: {ticketId, type}},
        json: true,
    }
    const {results} = await request(options);
    if (results.length > 1) { // Should only be one of any type for a ticket
        throw `More than one set of messages of type ${type} for ticket ${ticketId}`;
    } else if (results.length === 0) {
        return null;
    } else {
        return results[0];
    }
}

async function createTicketMessages(ticketId, type, messageIds = []) {
    if (!ticketId || !type) {
        throw new Error('Missing fields');
    }
    const existingMessages = await getMessageIdsByTicketAndType(ticketId, type);
    if (existingMessages !== null) {
        throw `Existing ticket messages object for type ${type} for ticket ${ticketId}`;
    }
    const options = {
        method: 'POST',
        uri: ticketMessagesClassPath,
        headers: sharedHeaders,
        body: {ticketId, type, messageIds},
        json: true,
    }
    return await request(options);
}

async function addToTicketMessageIds(objectId, messageIds, messageId) {
    if (!objectId || messageIds === undefined || !messageId) {
        throw new Error('Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${ticketMessagesClassPath}/${objectId}`,
        headers: sharedHeaders,
        body: {messageIds: messageIds.concat(messageId)},
        json: true,
    }
    return await request(options);
}

module.exports = {
    MessageTypes,
    addToTicketMessageIds,
    createMessage,
    createTicketMessages,
    getMessageIdsByTicketAndType,
}