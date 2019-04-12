const {controller: notificationController} = require('../notification/notification.route');

class MessageController {
    constructor(models = []) {
        this._model = Object.assign({}, ...models);
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
            res.status(200).send(result);
            const ticket = await this._model.getTicket(ticketId);
            if (ticket.creator === sender) {
                const assignees = ticket.assigned.split(', ');
                notificationController.createNotificationForUsers(
                    assignees,
                    `New comment on ticket ${ticketId}`,
                    `Comment: ${message}`
                );
            } else {
                notificationController.createNotificationForUsers(
                    [ticket.creator],
                    `An admin has replied to ticket ${ticketId}`,
                    `Comment: ${message}`,
                );
            }
            return;
        } catch (err) {
            console.error(err.error);
            return res.status(500).send();
        }
    }
}

module.exports = {
    MessageController,
}
