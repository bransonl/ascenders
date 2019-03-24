class MessageController {
    constructor(model) {
        this._model = model;
        this.addMessageToTicket = this.addMessageToTicket.bind(this);
        this.getCommentsByTicket = this.getCommentsByTicket.bind(this);
        this.addCommentToTicket = this.addCommentToTicket.bind(this);
    }

    async addMessageToTicket(ticketId, type, messageId) {
        const ticketMessages = await this._model.getMessageIdsByTicketAndType(ticketId, type);
        try {
            if (ticketMessages === null) {
                return await this._model.createTicketMessages(ticketId, type, [messageId]);
            } else {
                return await this._model.addToTicketMessageIds(
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
    
    async getCommentsByTicket(req, res) {
        const {ticketId} = req.params;
        try {
            const result = await this._model.getMessagesByTicketAndType(
                ticketId,
                this._model.MessageTypes.COMMENT
            );
            if (result === null) {
                return res.json({messages: []})
            }
            return res.json(result);
        } catch (err) {
            console.error(err.error);
            return res.status(500).send();
        }
    }
    
    // TODO: add permission checking
    async addCommentToTicket(req, res) {
        const {ticketId} = req.params;
        const {message} = req.body;
        const sender = req.user.objectId;
        try {
            const messageResult = await this._model.createMessage(ticketId, sender, message);
            const result = await this.addMessageToTicket(
                ticketId,
                this._model.MessageTypes.COMMENT,
                messageResult.objectId
            );
            return res.status(200).send(result);
        } catch (err) {
            console.error(err.error);
            return res.status(500).send();
        }
    }
}

module.exports = {
    MessageController,
}
