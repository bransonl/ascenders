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
    try {
        const getTicketsResult = await ticketModelModel.getTickets(user.objectId);
        return res.json(getTicketsResult);
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
    const {data} = req.body;
    try {
        const modifyTicketResult = await ticketModel.modifyTicket(ticketId,data);
        return res.status(200).json({
            message: 'Updated',
        });
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

// // close ticket instead of deleting
// async function deleteTicket(req, res) {
//     const ticketId = req.params.ticketId;
//     try {
//         const deleteTicketResult = await ticketModel.deleteTicket(ticketId);
//         return res.status(200).json({
//             message: 'Deleted',
//         });
//     } catch (err) {
//         return res.status(err.statusCode).json({
//             message: err.error.error,
//         });
//     }
// }

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

