const auth = require('../auth.js');
const {MessageController} = require('./message.controller');
const messageModel = require('./message.model');

const controller = new MessageController([messageModel]);

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
