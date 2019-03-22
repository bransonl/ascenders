const auth = require('../auth.js');
const ticketController = require('./ticket.controller.js');
const awsController = require('../aws/aws.controller.js');

function routes(app) {
    app.route('/ticket') // define endpoint of backend
    .post( // to make this API call
        auth.validateToken,
        ticketController.createTicket); 

    app.route('/tickets')
    .get(
        auth.validateToken,
        ticketController.getTickets);
    
    app.route('/ticket/:ticketId')
    .get(
        auth.validateToken,
        ticketController.getTicket);

    app.route('/ticket/:ticketId')
    .put(
        auth.validateToken,
        ticketController.modifyTicket);

    // app.route('ticket/:ticketId')
    // .delete(ticketController.deleteTicket);

    app.route('/ticket/uploadFile')
    .post(
        awsController.uploadFile);
};

module.exports = {
    routes,
}