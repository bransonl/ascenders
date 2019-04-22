const {controller: notificationController} = require('../notification/notification.route');

class TicketController {
    constructor(models = []) {
        this._model = Object.assign({}, ...models);

        this.createTicket = this.createTicket.bind(this);
        this.addAttachment = this.addAttachment.bind(this);
        this.closeTicket = this.closeTicket.bind(this);

        this.getUserOpenTickets = this.getUserOpenTickets.bind(this);
        this.getUserClosedTickets = this.getUserClosedTickets.bind(this);
        this.getLabelTickets = this.getLabelTickets.bind(this);

        this.getAllOpenTickets = this.getAllOpenTickets.bind(this);
        this.getAllClosedTickets = this.getAllClosedTickets.bind(this);
        this.getTicket = this.getTicket.bind(this);

        this.addAdmin = this.addAdmin.bind(this);
        this.addTag = this.addTag.bind(this);
        this.addStatus = this.addStatus.bind(this);
        this.addPriority = this.addPriority.bind(this);

        this._modifyTicket = this._modifyTicket.bind(this);
        this._getTicket = this._getTicket.bind(this);
        this._beautifyDate = this._beautifyDate.bind(this);
    }

    async createTicket(req, res) {
        console.log('createTicket called');
        req.body.creator = req.user.username;
        const {title, body, creator} = req.body;
        let attachments = req.body.attachments;
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
        if (!newAttachment) {
            return res.status(400).json({
                message:'Missing fields'
            })
        }
        let ticket;
        try { // check ticket exist
            ticket = await this._getTicket(ticketId);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        let attachments = ticket.attachments;
        if (!attachments) {
            attachments = newAttachment;
        }
        else {
            attachments = `${attachments}, ${newAttachment}`;
        }
        try {
            const modifyTicketResult = await this._modifyTicket(ticketId, {attachments:attachments});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getUserOpenTickets(req, res) {
        const username = req.user.username;
        try {
            const getTicketsResult = await this._model.getUserOpenTickets(username);
            const beautifiedResult = await this._beautifyDate(getTicketsResult);
            console.log(beautifiedResult);
            return res.status(200).send(beautifiedResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getUserClosedTickets(req, res) {
        const username = req.user.username;
        try {
            const getTicketsResult = await this._model.getUserClosedTickets(username);
            const beautifiedResult = await this._beautifyDate(getTicketsResult);
            return res.status(200).send(beautifiedResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getLabelTickets(req, res) {
        console.log("getLabelTickets");
        const {labelType} = req.body;
        const labelId = req.label.objectId;
        if (!labelType | !req.label | !labelId) {
            return res.status(400).json({
                message:'Missing fields',
            })
        }
        else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
            return res.status(400).json({
                message: 'Invalid labelType',
            })
        }
        else if (labelId.length !=10) {
            return res.status(400).json({
                message: 'Invalid labelId',
            })
        }
        try {
            const getLabelTicketsResult = await this._model.getLabelTickets(labelType, labelId);
            const beautifiedResult = await this._beautifyDate(getLabelTicketsResult);
            return res.status(200).send(beautifiedResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getAllOpenTickets(req, res) {
        try {
            const getTicketsResult = await this._model.getAllOpenTickets();
            const beautifiedResult = await this._beautifyDate(getTicketsResult);
            return res.status(200).send(beautifiedResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getAllClosedTickets(req, res) {
        try {
            const getTicketsResult = await this._model.getAllClosedTickets();
            const beautifiedResult = await this._beautifyDate(getTicketsResult);
            return res.status(200).send(beautifiedResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getTicket(req, res) {
        const {ticketId} = req.params;
        try {
            const getTicketResult = await this._getTicket(ticketId);
            return res.status(200).send(getTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
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
            let assignedUsernames;
            if (ticket.assigned != undefined) {
                assignedUsernames = ticket.assigned.split(",");
                if (assignedUsernames.includes(username)) {
                    return res.status(304).json({
                        message: `User already assigned`
                    });
                }
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
        const label = req.label;
        if (label.labelType != 'tag') {
            return res.status(400).json({
                message:`Wrong method for ${label.labelType}`,
            })
        }
        let ticket;
        try {
            ticket = await this._getTicket(ticketId);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        let tag = ticket.tag;
        if (!tag) {
            tag = label.objectId;
        }
        else {
            tag = `${tag}, ${label.objectId}`;
        }
        try {
            const modifyTicketResult = await this._modifyTicket(ticketId, {tag});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async addStatus(req, res) { //only 1
        console.log('addStatus called');
        const {ticketId} = req.params;
        const label = req.label;
        if (label.labelType != 'status') {
            return res.status(400).json({
                message:`Wrong method for ${label.labelType}`,
            })
        }
        try {
            const ticket = await this._getTicket(ticketId);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        const labelId = label.objectId;
        if (!labelId) {
            return res.status(400).json({
                message: 'Missing fields',
            })
        }
        try {
            const modifyTicketResult = await this._modifyTicket(ticketId, {status:labelId});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async addPriority(req, res) { //only 1
        console.log('addPriority called');
        const {ticketId} = req.params;
        const label = req.label;
        if (label.labelType != 'priority') {
            return res.status(400).json({
                message:`Wrong method for ${label.labelType}`,
            })
        }
        try {
            const ticket = await this._getTicket(ticketId);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        const labelId = label.objectId;
        if (!labelId) {
            return res.status(400).json({
                message: 'Missing fields',
            })
        }
        try {
            const modifyTicketResult = await this._modifyTicket(ticketId, {priority:labelId});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async closeTicket(req, res) {
        const ticketId = req.params.ticketId;
        if (!ticketId) {
            return res.status(400).json({
                message: 'Missing fields',
            })
        }
        else if (ticketId.length !=10) {
            return res.status(400).json({
                message: 'Invalid ticketId',
            })
        }
        try {
            const ticket = await this._getTicket(ticketId);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        try {
            const closeTicketResult = await this._modifyTicket(ticketId, {status:'closed'});
            return res.status(200).send({
                message: 'Ticket closed',
            });
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    //helper functions
    async _modifyTicket(ticketId, data) {
        if (!data) {
            throw new ModelError(500, 'Missing fields');
        }
        const keys = Object.keys(data);
        var i;
        for (i=0; i<keys.length; i++) {
            if (keys[i].length == 0) {
                throw new ModelError(400, 'Invalid key value');
            }
        }
        try {
            const ticket = await this._getTicket(ticketId);
        } catch(err) {
            throw new ModelError(err.statusCode,err.error.error);
        }
        try {
            const modifyTicketResult = await this._model.modifyTicket(ticketId, data);
            return modifyTicketResult;
        } catch (err) {
            throw new ModelError(err.statusCode, err.error.error);
        }
    }

    async _getTicket(ticketId) {
        if (!ticketId) {
            throw new ModelError(400, 'Missing ticketId');
        }
        else if (ticketId.length !=10) {
            throw new ModelError(400, 'Invalid ticketId');
        }
        try {
            const getTicketResult = await this._model.getTicket(ticketId);
            return getTicketResult;
        } catch(err) {
            if (err.statusCode == 404) {
                throw new ModelError(404, 'Ticket not found');
            }
            throw new ModelError(err.statusCode, err.error.error);
        }
    }
    
    async _beautifyDate(getTicketsResult) {
        var i;
        for (i=0; i<getTicketsResult.length; i++) {
            const ticket = getTicketsResult[i];
            getTicketsResult[i].createdAt = ticket.createdAt.substring(0,10) + ' ' + ticket.createdAt.substring(11,19);
            getTicketsResult[i].updatedAt = ticket.updatedAt.substring(0,10) + ' ' + ticket.updatedAt.substring(11,19);
        }
        return getTicketsResult;
    }
}

module.exports = {
    TicketController,
}
