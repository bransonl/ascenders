const auth = require('../auth');
const ticketModel = require('./ticket.model');
const {TicketController} = require('./ticket.controller');

const awsModel = require('../aws/aws.model');
const {AwsController} = require('../aws/aws.controller');

const userModel = require('../user/user.model');

const labelModel = require('../label/label.model');
const {LabelController} = require('../label/label.controller');

const ticketController = new TicketController([ticketModel, userModel]);
const awsController = new AwsController(awsModel);
const labelController = new LabelController(labelModel);

function routes(app) {
    //create tickets
    app.route('/tickets')
    .post(
        auth.validateTokenMiddleware,
        ticketController.createTicket,
    )
    .delete(
        auth.validateTokenMiddleware,
        auth.createRoleCheck('admin'),
        ticketController.deleteAllTickets,
    );

    app.route('/tickets/upload/:ticketId')
    .put(
        auth.validateTokenMiddleware,
        awsController.uploadFile,
        ticketController.addAttachment,
    );

    //get tickets
    app.route('/tickets/user')
    .get(
        auth.validateTokenMiddleware,
        ticketController.getUserOpenTickets,
    );
    app.route('/tickets/user/closed')
    .get(
        auth.validateTokenMiddleware,
        ticketController.getUserClosedTickets,
    );
    app.route('/tickets/label')
    .get(
        auth.validateToken,
        labelController.getLabell,
        ticketController.getLabelTickets,
    );
    app.route('/tickets/admin')
    .get(
        auth.validateTokenMiddleware,
        auth.createRoleCheck('admin'),
        ticketController.getAllOpenTickets,
    )
    app.route('/tickets/admin/closed')
    .get(
        auth.validateTokenMiddleware,
        auth.createRoleCheck('admin'),
        ticketController.getAllClosedTickets,
    )
    app.route('/tickets/:ticketId')
    .get(
        auth.validateTokenMiddleware,
        ticketController.getTicket,
    );

    //close ticket
    app.route('/tickets/close/:ticketId')
    .put(
        auth.validateTokenMiddleware,
        ticketController.closeTicket,
    );

    //filtering
    app.route('/tickets/assign/:ticketId') //assign ticket to admin
    .put(
        auth.validateTokenMiddleware,
        auth.createRoleCheck('admin'),
        ticketController.addAdmin,
    );
    app.route('/tickets/addtag/:ticketId')
    .put(
        auth.validateToken,
        auth.createRoleCheck('admin'),
        labelController.getLabell,
        ticketController.addTag,
    );
    app.route('/tickets/addstatus/:ticketId')
    .put(
        auth.validateToken,
        auth.createRoleCheck('admin'),
        labelController.getLabell,
        ticketController.addStatus,
    );
    app.route('/tickets/addpriority/:ticketId')
    .put(
        auth.validateToken,
        auth.createRoleCheck('admin'),
        labelController.getLabell,
        ticketController.addPriority,
    );
};

module.exports = {
    routes,
}
