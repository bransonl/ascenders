class TicketController {
    constructor(model) {
        this._model = model;

        this.createTicket = this.createTicket.bind(this);
        this.getUserTickets = this.getUserTickets.bind(this);
        this.getAllTickets = this.getAllTickets.bind(this);
        this.getTicket = this.getTicket.bind(this);
        this.modifyTicket = this.modifyTicket.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.closeTicket = this.closeTicket.bind(this);
    }

    async createTicket(req, res) {
        req.body.creator = req.user.objectId;
        const {title, body, creator} = req.body;
        let attachments = req.body.attachments;
        if (!title | !body | !creator) {
            const fieldsMissing = [];
            if (!title) {
                fieldsMissing.push('title');
            }
            if (!body) {
                fieldsMissing.push('body');
            }
            if (!creator) {
                fieldsMissing.push('creator');
            }
            return res.status(400).send({
                message: `Missing ${fieldsMissing.join(`, `)}`,
            });
        }
        if (!attachments) {
            attachments = '';
        }
        try { 
            const createTicketResult = await this._model.createTicket(title, body, creator, attachments);
            return res.status(200).send(createTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getUserTickets(req, res) {
        const userId = req.user.objectId;
        try {
            const getTicketsResult = await this._model.getUserTickets(userId);
            return res.status(200).send(getTicketsResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getAllTickets(req, res) {
        try {
            const getTicketsResult = await this._model.getUserTickets(userId);
            return res.status(200).send(getTicketsResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getTicket(req, res) {
        const ticketId = req.params.ticketId;
        try {
            const getTicketResult = await this._model.getTicket(ticketId);
            return res.status(200).send(getTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async addAttachment(req, res) {
        const ticketId = req.params.ticketId;
        const newAttachment = req.fileURL;
        console.log(newAttachment);
        const ticket = await this._model.getTicket(ticketId);
        let attachments = ticket.attachments;
        if (!attachments) {
            attachments = newAttachment;
        }
        else {
            attachments = `${attachments}, ${newAttachment}`;
        }
        try {
            const modifyTicketResult = await this._model.modifyTicket(ticketId,{attachments:attachments});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async closeTicket(req, res) {
        const ticketId = req.params.ticketId;
        try {
            const closeTicketResult = await this._model.closeTicket(ticketId);
            return res.status(200).send({
                message: 'Closed',
            });
        } catch (err) {
            return res.status(500).send();
        }
    }

    //helper function
    async modifyTicket(ticketId, data) {
        if (!ticketId | !data) {
            return new ModelError(400,'Missing fields');
        }
        console.log(data);
        try {
            const modifyTicketResult = await this._model.modifyTicket(ticketId,data);
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }
}

module.exports = {
    TicketController,
}

