const auth = require('../auth.js');
const messageController = require('./message.controller');

function routes(app) {
    app.route('/tickets/:ticketId/comments')
        .post(
            auth.validateToken,
            messageController.addCommentToTicket
        );
}
    
module.exports = {
    routes,
}