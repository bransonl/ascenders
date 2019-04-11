const auth = require('../auth.js');
const labelModel = require('./label.model');
const {LabelController} = require('./label.controller');

const controller = new LabelController(labelModel);

function routes(app) {
    app.route('/label/:labelType')
    .get(
        auth.validateTokenMiddleware,
        controller.getLabelItems,
        );
    app.route('/label/:labelType')
    .post(
        auth.validateTokenMiddleware,
        auth.createRoleCheck('admin'),
        controller.createLabel,
        );
}

module.exports = {
    routes,
}
