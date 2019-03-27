const auth = require('../auth');
const ticketModel = require('./ticket.model');
const {TicketController} = require('./ticket.controller');

const ticketController = new TicketController(ticketModel)

function routes(app) {
    app.route('/tickets') // define endpoint of backend
    .post( // to make this API call
        auth.validateToken,
        ticketController.createTicket
        )
    .get(
        auth.validateToken,
        ticketController.getTickets
        );
    app.route('/tickets/:ticketId')
    .get(
        auth.validateToken,
        ticketController.getTicket
        )
    .put(
        auth.validateToken,
        ticketController.modifyTicket
        );
    app.route('/tickets/close/:ticketId')
    .put(
        auth.validateToken,
        ticketController.closeTicket
        );
};

module.exports = {
    routes,
}