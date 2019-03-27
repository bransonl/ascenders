const auth = require('../auth.js');
const labelModel = require('./label.model');
const {LabelController} = require('./label.controller');

const controller = new LabelController(labelModel);

function routes(app) {
    app.route('/label/:labelType')
    .get(
        auth.validateToken,
        controller.getLabelItems,
        );
    app.route('/label/:labelType')
    .post(
        auth.validateToken,
        auth.createRoleCheck('admin'),
        controller.createLabel,
        );
}

module.exports = {
    routes,
}