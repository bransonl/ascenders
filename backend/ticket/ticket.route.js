const ticketController = require('./ticket.controller.js');

function routes(app) {
    app.route('/classes/ticket')
    .post(ticketController.createTicket);
    
    app.route('/classes/ticket/:objectId')
    .get(ticketController.getTicket)
};

module.exports = {
    routes,
}