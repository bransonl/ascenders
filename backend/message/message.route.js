const auth = require('../auth.js');
const {MessageController} = require('./message.controller');
const messageModel = require('./message.model');
const ticketModel = require('../ticket/ticket.model');

const controller = new MessageController([messageModel, ticketModel]);

function routes(app) {
    app.route('/tickets/:ticketId/comments')
        .get(
            auth.validateTokenMiddleware,
            controller.getCommentsByTicket,
        )
        .post(
            auth.validateTokenMiddleware,
            controller.addCommentToTicket,
        );
}

module.exports = {
    routes,
}
