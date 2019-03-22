const messageModel = require('./message.model');

async function addMessageToTicket(ticketId, type, messageId) {
    const ticketMessages = await messageModel.getMessageIdsByTicketAndType(ticketId, type);
    try {
        if (ticketMessages === null) {
            return await messageModel.createTicketMessages(ticketId, type, [messageId]);
        } else {
            return await messageModel.addToTicketMessageIds(
                ticketMessages.objectId,
                ticketMessages.messageIds,
                messageId
            );
        }
    } catch (err) {
        console.error(err.error);
        return res.status(500).send();
    }
    
}

async function getCommentsByTicket(req, res) {
    const {ticketId} = req.params;
    try {
        const result = await messageModel.getMessageIdsByTicketAndType(
            ticketId,
            messageModel.MessageTypes.COMMENT
        );
        if (result === null) {
            return res.json({messageIds: []})
        }
        return res.json({messageIds: result.messageIds});
    } catch (err) {
        console.error(err.error);
        return res.status(500).send();
    }
}

// TODO: add permission checking
async function addCommentToTicket(req, res) {
    const {ticketId} = req.params;
    const {message} = req.body;
    const sender = req.user.objectId;
    try {
        const messageResult = await messageModel.createMessage(ticketId, sender, message);
        const result = await addMessageToTicket(
            ticketId,
            messageModel.MessageTypes.COMMENT,
            messageResult.objectId
        );
        return res.status(200).send(result);
    } catch (err) {
        console.error(err.error);
        return res.status(500).send();
    }
}

module.exports = {
    addCommentToTicket,
    getCommentsByTicket,
}