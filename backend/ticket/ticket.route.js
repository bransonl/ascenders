const ticketController = require('./ticket.controller.js');

function routes(app) {
    app.route('/classes/ticket')
    .post(ticketController.createTicket);
    
    // app.route('/ticket/:objectId')
    // .get(ticketController.getTicketbyId);
};

module.exports = {
    routes,
}