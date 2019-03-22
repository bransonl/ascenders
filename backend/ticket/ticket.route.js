const auth = require('../auth.js');
const ticketController = require('./ticket.controller.js');
const awsController = require('../aws/aws.controller.js');

function routes(app) {
    app.route('/tickets') // define endpoint of backend
    .post( // to make this API call
        auth.validateToken,
        ticketController.createTicket); 

    app.route('/tickets')
    .get(
        auth.validateToken,
        ticketController.getTickets);
    
    app.route('/tickets/:ticketId')
    .get(
        auth.validateToken,
        ticketController.getTicket);

    app.route('/tickets/:ticketId')
    .put(
        auth.validateToken,
        ticketController.modifyTicket);

    app.route('tickets/close/:ticketId')
    .put(ticketController.closeTicket);

    app.route('/tickets/uploadFile')
    .post(
        auth.validateToken,
        awsController.uploadFile);
};

module.exports = {
    routes,
}