const {ModelError} = require('../error');

let numTicketMessages = 0;
let ticketMessagesByObjectId = {};
let ticketMessagesByTicketId = {};

let numMessages = 0;
let messages = {};

const sampleTimestamp = '2019-04-01T12:22:24.259Z';
const sampleBeautifiedTimestamp = '2019-04-01 12:22:24';

const MessageTypes = Object.freeze({
    COMMENT: 'comment',
    CHAT: 'chat',
});

async function createMessage(ticketId, sender, message) {
    messages[numMessages] = {
        ticketId,
        sender,
        message,
        createdAt: sampleTimestamp,
        updatedAt: sampleTimestamp,
    }
    return response = {
        objectId: numMessages++,
    };
}

async function getMessagesByTicketAndType(ticketId, type) {
    if (!(ticketId in ticketMessagesByTicketId) || !(type in ticketMessagesByTicketId[ticketId])) {
        return null;
    }
    const messageIds = ticketMessagesByTicketId[ticketId][type].messageIds;
    return {messages: messageIds.map(messageId => messages[messageId])};
}

async function getMessageIdsByTicketAndType(ticketId, type) {
    if (!(ticketId in ticketMessagesByTicketId) || !(type in ticketMessagesByTicketId[ticketId])) {
        return null;
    }
    return ticketMessagesByTicketId[ticketId][type];
}

async function createTicketMessages(ticketId, type, messageIds = []) {
    if (ticketId in ticketMessagesByTicketId && type in ticketMessagesByTicketId[ticketId]) {
        throw new ModelError(
            500,
            `Existing ticket messages object for type ${type} for ticket ${ticketId}`,
        );
    }
    // doesn't exist yet, so create new one
    if (!(ticketId in ticketMessagesByTicketId) || !(type in ticketMessagesByTicketId[ticketId])) {
        ticketMessagesByObjectId[numTicketMessages] = {
            objectId: numTicketMessages,
            ticketId,
            type,
            messageIds,
            createdAt: sampleTimestamp,
            updatedAt: sampleTimestamp,
        };
        if (!(ticketId in ticketMessagesByTicketId)) {
            ticketMessagesByTicketId[ticketId] = {};
        }
        ticketMessagesByTicketId[ticketId][type] = ticketMessagesByObjectId[numTicketMessages];
    }
    ticketMessagesByObjectId[numTicketMessages].messageIds = messageIds;
    return {
        objectId: numTicketMessages++,
    };
}

async function addToTicketMessageIds(objectId, messageIds, messageId) {
    ticketMessagesByObjectId[objectId].messageIds = messageIds.concat(messageId);
}

function init() {
    console.log('init message model mock');
    numTicketMessages = 0;
    ticketMessagesByObjectId = {};
    ticketMessagesByTicketId = {};

    numMessages = 0;
    messages = {};
}

module.exports = {
    sampleTimestamp,
    sampleBeautifiedTimestamp,
    init,

    MessageTypes,
    addToTicketMessageIds,
    createMessage,
    createTicketMessages,
    getMessageIdsByTicketAndType,
    getMessagesByTicketAndType,
};
