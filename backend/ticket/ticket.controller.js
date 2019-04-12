
class TicketController {
    constructor(model) {
        this._model = model;

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

        this._modifyTicket = this._modifyTicket.bind(this);
        this._getTicket = this._getTicket.bind(this);
    }

    async createTicket(req, res) {
        console.log('createTicket called');
        const creator = req.user.objectId;
        const {title, body} = req.body;
        let attachments = req.body.attachments;
        if (!attachments) {
            attachments = '';
        }
        if (!title | !body) {
            return res.status(400).json({
                message:'Missing fields',
            });
        }
        if (!creator) {
            return res.status(500).json({
                message:'Missing JWT',
            })
        }
        else if (creator.length !=10) {
            return res.status(500).json({
                message: 'Invalid userId',
            })
        }
        try { 
            const createTicketResult = await this._model.createTicket(title, body, creator, attachments);
            return res.status(200).send(createTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
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

    async getUserTickets(req, res) {
        const userId = req.user.objectId;
        if (!userId) {
            return res.status(500).json({
                message:'Missing JWT',
            })
        }
        else if (userId.length !=10) {
            return res.status(500).json({
                message: 'Invalid userId',
            })
        }
        try {
            const getTicketsResult = await this._model.getUserTickets(userId);
            return res.status(200).send(getTicketsResult);
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
            return res.status(200).send(getLabelTicketsResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
        }
    }

    async getAllTickets(req, res) {
        try {
            const getTicketsResult = await this._model.getAllTickets();
            return res.status(200).send(getTicketsResult);
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
        const newAdmin = req.user;
        const newAdminId = newAdmin.objectId;
        console.log(newAdminId);
        if (newAdmin.role != 'admin') {
            return res.status(401).json({
                message:'This user is unauthorized'
            });
        }
        let ticket;
        try {
            ticket = await this._getTicket(ticketId);
        } catch(err) {
            return res.status(err.statusCode).json(err);
        }
        let assigned = ticket.assigned;
        if (assigned == undefined) {
            assigned = newAdminId;
        }
        else {
            const assignedArray = assigned.split(', ');
            var i;
            for (i=0; i<assignedArray.length;i++) {
                if (newAdminId==assignedArray[i]){
                    return res.status(400).json({
                        message:'Admin already assigned to this ticket',
                    })
                }
            }
            assigned += ', ' + newAdminId;
        }
        try {
            const modifyTicketResult = await this._modifyTicket(ticketId, {assigned});
            return res.status(200).send(modifyTicketResult);
        } catch (err) {
            return res.status(err.statusCode).json(err);
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
            const closeTicketResult = await this._modifyTicket(ticketId, {status:'k8nQSGO3BN'});
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
}

module.exports = {
    TicketController,
}

