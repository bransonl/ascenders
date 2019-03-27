const auth = require('../auth');
const awsModel = require('./aws.model');
const {AwsController} = require('./aws.controller');

const awsController = new AwsController(awsModel);

function routes(app) {
    app.route('/tickets/upload')
    .post(
        auth.validateToken,
        awsController.uploadFile
        );
}

module.exports = {
    routes,
}