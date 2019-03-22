const messageModel = require('./message.model');

async function addMessageToTicket(ticketId, type, messageId) {
    const ticketMessages = await messageModel.getTicketMessages(ticketId, type);
    if (ticketMessage === null) {
        const result = await messageModel.createTicketMessages(ticketId, type, [messageId]);
    } else {
        const result = await messageModel.addToTicketMessageIds(
            ticketMessages.objectId,
            ticketMessages.messageIds,
            messageId
        );
    }
}

module.exports = {
    addMessageToTicket,
}