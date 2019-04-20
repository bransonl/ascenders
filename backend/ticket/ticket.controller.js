const {controller: notificationController} = require('../notification/notification.route');

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
        req.body.creator = req.user.username;
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
            res.status(200).send(createTicketResult);
            const admins = await this._model.getAdmins();
            const adminUsernames = admins.map(admin => admin.username);
            notificationController.createNotificationForUsers(
                adminUsernames,
                `New Ticket`,
                `Title: ${title},
                Body: ${body}`
            );
            return;
        } catch (err) {
            console.error(err);
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
        const username = req.user.username;
        try {
            const getTicketsResult = await this._model.getUserTickets(username);
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
        const username = req.body.username;
        if (!username) {
            res.status(400).json({
                message: 'Missing username',
            });
        }
        try {
            const newAdmin = await this._model.getUserByUsername(username);
            if (newAdmin.role !== 'admin') {
                return res.status(400).json({
                    message: 'This user has insufficient permissions'
                });
            }
            const ticket = await this._model.getTicket(ticketId);
            const assignedUsernames = ticket.assigned.split(",");
            if (assignedUsernames.includes(username)) {
                return res.status(304).json({
                    message: `User already assigned`,
                })
            }
            const assigned = ticket.assigned ? `${ticket.assigned},${username}` : username;
            try {
                const modifyTicketResult = await this._model.modifyTicket(ticketId,{assigned});
                return res.status(200).send(modifyTicketResult);
            } catch (err) {
                console.error(err);
                return res.status(500).send();
            }
        } catch (err) {
            console.error(err);
            if (err.statusCode === 404) {
                return res.status(404).json({
                    message: `No user with username ${username}`,
                });
            }
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
