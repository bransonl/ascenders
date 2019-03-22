const ticketModel = require('./ticket.model.js');

async function createTicket(req, res) {
    const user = req.user;
    const {title, body} = req.body;
    // ensures required fields a filled hurhur
    if (!title || !body) {
        const fieldsMissing = [];
        if (!title) {
            fieldsMissing.push('title');
        }
        if (!body) {
            fieldsMissing.push('body');
        }
        return res.status(400).json({
            message: `Missing ${fieldsMissing.join(`, `)}`,
        })
    }
    const creator = user.objectId;
    try { 
        // if conditions met then create ticket
        const createTicketResult = await ticketModel.createTicket(title, body, creator, attachments);
        return res.json(createTicketResult);
    } catch (err) {
        // if error then send error message
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

async function getTickets(req, res) {
    const user = req.user;
    console.log(`getting tickets created by user ${user.username}, ${user.objectId}`)
    try {
        const getTicketsResult = await ticketModel.getTickets(user.objectId);
        return res.send(getTicketsResult);
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

async function getTicket(req, res) {
    const ticketId = req.params.ticketId;
    try {
        const getTicketResult = await ticketModel.getTicket(ticketId);
        return res.json(getTicketResult);
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

async function modifyTicket(req, res) {
    const ticketId = req.params.ticketId;
    const data = req.body;
    console.log(`controller req.body ${req.body}`);
    console.log(`controller data ${data}`);
    try {
        const modifyTicketResult = await ticketModel.modifyTicket(ticketId,data);
        const getTicketResult = await ticketModel.getTicket(ticketId);
        return res.status(200).json({
            message: 'Updated',
            getTicketResult,
        });
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

async function closeTicket(req, res) {
    const ticketId = req.params.ticketId;
    try {
        const closeTicketResult = await ticketModel.closeTicket(ticketId);
        return res.status(200).json({
            message: 'Closed',
        });
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

// async function createTag(req, res) {
//     // should tags be stored as string[] in backend? or just classes/tag
//     // ditto priority and status
//     // check if tag with same name already exists
// }

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    modifyTicket,
    // deleteTicket,
}

