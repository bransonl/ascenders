const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env');
const {ModelError} = require('../error');

const messageClassPath = `${apiEndpoint}/classes/message`;
const ticketMessagesClassPath = `${apiEndpoint}/classes/ticketMessages`;

const MessageTypes = Object.freeze({
    COMMENT: 'comment',
    CHAT: 'chat',
});

// Stores a message
async function createMessage(ticketId, sender, message) {
    if (!ticketId || !sender || !message) {
        throw new ModelError(400, 'Missing fields');
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
    try {
        return await request(options);
    } catch (err) {
        return new ModelError(err.statusCode, err.error.error);
    }
}

async function getMessagesByTicketAndType(ticketId, type) {
    if (!ticketId || !type) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: ticketMessagesClassPath,
        headers: sharedHeaders,
        qs: {where: {ticketId, type}, include: 'messageIds'},
        json: true,
    }
    const {results} = await request(options);
    if (results.length > 1) { // Should only be one of any type for a ticket
        throw new ModelError(
            500,
            `More than one set of messages of type ${type} for ticket ${ticketId}`
        );
    } else if (results.length === 0) {
        return null;
    } else {
        // Rename 'messageIds' key to 'messages'
        results[0].messages = [...results[0].messageIds];
        delete results[0].messageIds;
        return results[0];
    }
}

async function getMessageIdsByTicketAndType(ticketId, type) {
    if (!ticketId || !type) {
        throw new ModelError(400, 'Missing fields');
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
        throw new ModelError(
            500,
            `More than one set of messages of type ${type} for ticket ${ticketId}`
        );
    } else if (results.length === 0) {
        return null;
    } else {
        return results[0];
    }
}

async function createTicketMessages(ticketId, type, messageIds = []) {
    if (!ticketId || !type) {
        throw new ModelError(400, 'Missing fields');
    }
    const existingMessages = await getMessageIdsByTicketAndType(ticketId, type);
    if (existingMessages !== null) {
        throw new ModelError(
            500,
            `Existing ticket messages object for type ${type} for ticket ${ticketId}`
        );
    }
    const options = {
        method: 'POST',
        uri: ticketMessagesClassPath,
        headers: sharedHeaders,
        body: {
            ticketId,
            type,
            messageIds: messageIds.map(messageId => ({
                __type: 'Pointer',
                className: 'message',
                objectId: messageId,
            })),
        },
        json: true,
    }
    return await request(options);
}

async function addToTicketMessageIds(objectId, messageIds, messageId) {
    if (!objectId || messageIds === undefined || !messageId) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${ticketMessagesClassPath}/${objectId}`,
        headers: sharedHeaders,
        body: {
            messageIds: messageIds.concat({
                __type: 'Pointer',
                className: 'message',
                objectId: messageId,
            }),
        },
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
    getMessagesByTicketAndType,
}
