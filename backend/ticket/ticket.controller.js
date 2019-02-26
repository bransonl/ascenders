const ticketModel = require('./ticket.model.js');

async function createTicket(req, res) {
    const {title, body, creator, attachments} = req.body;
    const createTicketResult = await ticketModel.createTicket(title, body, creator, attachments);
    res.send(createTicketResult);
}

// async function getTicketbyId(req, res) {  
//     const {ticketId} = req.body;
//     const getTicketResult = await ticketModel.getTicketbyId(ticketId);
//     res.send(getTicketResult);
// }

// async function getTicketbyTitle(req, res) {
//     const {title} = req.body;
//     const getTicketResult = await ticketModel.getTicketbyTitle(title);
//     res.send(getTicketResult);
// }

module.exports = {
    createTicket,
    // getTicketbyId,
    // getTicketbyTitle,
}