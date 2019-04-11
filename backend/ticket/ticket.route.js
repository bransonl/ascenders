const auth = require('../auth');
const ticketModel = require('./ticket.model');
const {TicketController} = require('./ticket.controller');

const ticketController = new TicketController(ticketModel)

function routes(app) {
    app.route('/tickets') // define endpoint of backend
    .post( // to make this API call
        auth.validateTokenMiddleware,
        ticketController.createTicket
        )
    .get(
        auth.validateTokenMiddleware,
        ticketController.getTickets
        );
    app.route('/tickets/:ticketId')
    .get(
        auth.validateTokenMiddleware,
        ticketController.getTicket
        )
    .put(
        auth.validateTokenMiddleware,
        ticketController.modifyTicket
        );
    app.route('/tickets/close/:ticketId')
    .put(
        auth.validateTokenMiddleware,
        ticketController.closeTicket
        );
};

module.exports = {
    routes,
}
