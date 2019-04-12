class TicketController {
    constructor(models = []) {
        this._model = Object.assign({}, ...models);

        this.createTicket = this.createTicket.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.closeTicket = this.closeTicket.bind(this);

        this.getUserTickets = this.getUserTickets.bind(this);
        this.getLabelTickets = this.getLabelTickets.bind(this);
        this.getAllTickets = this.getAllTickets.bind(this);
        this.getTicket = this.getTicket.bind(this);

        this.addAdmin = this.addAdmin.bind(this);
        this.addTag = this.addTag.bind(this);
        this.addStatus = this.addStatus.bind(this);
        this.addPriority = this.addPriority.bind(this);

        this.modifyTicket = this.modifyTicket.bind(this);
    }

    async createTicket(req, res) {
        console.log('createTicket called');
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
            console.log(createTicketResult);
            return res.status(200).send(createTicketResult);
        } catch (err) {
            console.log('createTicket error occured');
            return res.status(500).send();
        }
    }

    async addAttachment(req, res) {
        console.log('addAttachment called');
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

    async getUserTickets(req, res) {
        const userId = req.user.objectId;
        try {
            const getTicketsResult = await this._model.getUserTickets(userId);
            return res.status(200).send(getTicketsResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getLabelTickets(req, res) {
        console.log("getLabelTickets");
        const {labelType} = req.body;
        const labelId = req.label.objectId;
        try {
            const getLabelTicketsResult = await this._model.getLabelTickets(labelType, labelId);
            return res.status(200).send(getLabelTicketsResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async getAllTickets(req, res) {
        try {
            const getTicketsResult = await this._model.getAllTickets();
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

    async addAdmin(req, res) {
        const {ticketId} = req.params;
        const userId = req.body.userId;
        if (!userId) {
            res.status(400).json({
                message: 'Missing user id',
            });
        }
        const newAdmin = await this._model.getUser(userId);
        if (newAdmin.role !== 'admin') {
            return res.status(400).json({
                message: 'This user has insufficient permissions'
            });
        }
        const ticket = await this._model.getTicket(ticketId);
        let assigned = ticket.assigned;
        if (!assigned) {
            assigned = userId;
        }
        else {
            assigned = `${assigned}, ${userId}`;
        }
        try {
            const modifyTicketResult = await this._model.modifyTicket(ticketId,{assigned});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(500).send();
        }
    }

    async addTag(req, res) {
        console.log("addTag called");
        const {ticketId} = req.params;
        if (req.label != false) {
            const ticket = await this._model.getTicket(ticketId);
            let tag = ticket.tag;
            if (!tag) {
                tag = req.label.objectId;
            }
            else {
                tag = `${tag}, ${req.label.objectId}`;
            }
            try {
                const modifyTicketResult = await this._model.modifyTicket(ticketId,{tag});
                return res.status(200).send(modifyTicketResult);
            } catch (err) {
                return res.status(500).send();
            }
        }
    }

    async addStatus(req, res) { //only 1
        const {ticketId} = req.params;
        if (req.label != false) {
            const ticket = await this._model.getTicket(ticketId);
            try {
                const modifyTicketResult = await this._model.modifyTicket(ticketId,{status:req.label.objectId});
                return res.status(200).send(modifyTicketResult);
            } catch (err) {
                return res.status(500).send();
            }
        }
    }

    async addPriority(req, res) { //only 1
        const {ticketId} = req.params;
        if (req.label != false) {
            const ticket = await this._model.getTicket(ticketId);
            try {
                const modifyTicketResult = await this._model.modifyTicket(ticketId,{priority:req.label.objectId});
                return res.status(200).send(modifyTicketResult);
            } catch (err) {
                return res.status(500).send();
            }
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
