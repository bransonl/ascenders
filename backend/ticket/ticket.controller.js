const ticketModel = require('./ticket.model.js');

async function createTicket(req, res) {
    const {title, body, creator, attachments} = req.body;
    // ensures required fields a filled hurhur
    if (!title || !body || !creator) {
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
        })
    }
    try { 
        // if conditions met then create ticket
        const createTicketResult = await ticketModel.createTicket(title, body, creator, attachments);
        return res.send(createTicketResult);
    } catch (err) {
        // if error then send error message
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

async function getTicket(req, res) {  
    try {
        const {objectId} = req.params;
        const getTicketResult = await ticketModel.getTicket(objectId);
        res.send(getTicketResult);
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

module.exports = {
    createTicket,
    getTicket,
}