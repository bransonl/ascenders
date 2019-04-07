const auth = require('../auth');
const ticketModel = require('./ticket.model');
const {TicketController} = require('./ticket.controller');

const awsModel = require('../aws/aws.model');
const {AwsController} = require('../aws/aws.controller');

const userModel = require('../user/user.model');
const {UserController} = require('../user/user.controller');

const labelModel = require('../label/label.model');
const {LabelController} = require('../label/label.controller');

const ticketController = new TicketController(ticketModel);
const awsController = new AwsController(awsModel);
const userController = new UserController(userModel);
const labelController = new LabelController(labelModel);

function routes(app) {
    //create tickets
    app.route('/tickets')
    .post(
        auth.validateToken,
        ticketController.createTicket
    )
    app.route('/tickets/upload/:ticketId')
    .put(
        auth.validateToken,
        awsController.uploadFile,
        ticketController.addAttachment
    );

    //get tickets
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

    //close ticket
    app.route('/tickets/close/:ticketId')
    .put(
        auth.validateToken,
        ticketController.closeTicket
    );

    //filtering
    app.route('/tickets/assign/:ticketId') //assign ticket to admin
    .put(
        auth.validateToken,
        auth.createRoleCheck('admin'),
        userController.getUser,
        ticketController.addAdmin
    );
    app.route('/tickets/addtag/:ticketId')
    .put(
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        labelController.checkLabelExist_,
        ticketController.addTag,
    );
    app.route('/tickets/addstatus/:ticketId')
    .put(
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        labelController.checkLabelExist_,
        ticketController.addStatus,
    );
    app.route('/tickets/addpriority/:ticketId')
    .put(
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        labelController.checkLabelExist_,
        ticketController.addPriority,
    );
};

module.exports = {
    routes,
}