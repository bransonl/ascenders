class TicketController {
    constructor(model) {
        this._model = model;

        this.createTicket = this.createTicket.bind(this);
        this.getTickets = this.getTickets.bind(this);
        this.getTicket = this.getTicket.bind(this);
        this.modifyTicket = this.modifyTicket.bind(this);
        this.closeTicket = this.closeTicket.bind(this);
    }

    async createTicket(req, res) {
        req.body.creator = req.user.objectId;
        const {title, body, creator, attachments} = req.body;
        if (!title || !body) {
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
            return res.status(400).json({
                message: `Missing ${fieldsMissing.join(`, `)}`,
            });
        }
        try { 
            const createTicketResult = await this._model.createTicket(title, body, creator, attachments);
            return res.status(200).json(createTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getTickets(req, res) {
        const userId = req.user.objectId;
        try {
            const getTicketsResult = await this._model.getTickets(userId);
            return res.status(200).json(getTicketsResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getTicket(req, res) {
        const ticketId = req.params.ticketId;
        try {
            const getTicketResult = await this._model.getTicket(ticketId);
            return res.status(200).json(getTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async modifyTicket(req, res) {
        const ticketId = req.params.ticketId;
        const data = req.body;
        try {
            const modifyTicketResult = await this._model.modifyTicket(ticketId,data);
            return res.status(200).json({modifyTicketResult});
        } catch (err) {
            return res.status(500).send();
        }
    }

    async closeTicket(req, res) {
        const ticketId = req.params.ticketId;
        try {
            const closeTicketResult = await this._model.closeTicket(ticketId);
            return res.status(200).json({
                message: 'Closed',
            });
        } catch (err) {
            return res.status(500).send();
        }
    }

    // async createTag(req, res) {
    //     // should tags be stored as string[] in backend? or just classes/tag
    //     // ditto priority and status
    //     // check if tag with same name already exists
    // }
}

module.exports = {
    TicketController,
}

