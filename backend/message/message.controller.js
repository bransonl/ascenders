const messageModel = require('./message.model');

async function addMessageToTicket(ticketId, type, messageId) {
    const ticketMessages = await messageModel.getTicketMessages(ticketId, type);
    if (ticketMessage === null) {
        return await messageModel.createTicketMessages(ticketId, type, [messageId]);
    } else {
        return await messageModel.addToTicketMessageIds(
            ticketMessages.objectId,
            ticketMessages.messageIds,
            messageId
        );
    }
}

// TODO: add permission checking
async function addCommentToTicket(req, res) {
    const {ticketId} = req.params;
    const {message} = req.body;
    const sender = req.user.objectId;
    const messageResult = await messageModel.createMessage(ticketId, sender, message);
    await addMessageToTicket(ticketId, messageModel.MessageTypes.COMMENT, messageResult.objectId);
    return res.status(200);
}

module.exports = {
    addCommentToTicket,
}