const auth = require('../auth.js');
const messageController = require('./message.controller');

function routes(app) {
    app.route('/tickets/:ticketId/comments')
        .get(
            auth.validateToken,
            messageController.getCommentsByTicket,
        )
        .post(
            auth.validateToken,
            messageController.addCommentToTicket,
        );
}
    
module.exports = {
    routes,
}