const auth = require('../auth');
const ticketModel = require('./ticket.model');
const {TicketController} = require('./ticket.controller');
const awsModel = require('../aws/aws.model');
const {AwsController} = require('../aws/aws.controller');

const ticketController = new TicketController(ticketModel);
const awsController = new AwsController(awsModel);

function routes(app) {
    app.route('/tickets') // define endpoint of backend
    .post( // to make this API call
        auth.validateToken,
        ticketController.createTicket
    )
    app.route('/tickets/user')
    .get(
        auth.validateToken,
        ticketController.getUserTickets
    );
    app.route('/tickets/admin')
    .get(
        auth.validateToken,
        auth.createRoleCheck('admin'),
        ticketController.getAllTickets
    )
    app.route('/tickets/:ticketId')
    .get(
        auth.validateToken,
        ticketController.getTicket
    );
    app.route('/tickets/upload/:ticketId')
    .put(
        auth.validateToken,
        awsController.uploadFile,
        ticketController.addAttachment
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