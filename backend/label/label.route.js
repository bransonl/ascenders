const auth = require('../auth.js');
const labelModel = require('./label.model');
const {LabelController} = require('./label.controller');

const controller = new LabelController(labelModel);

function routes(app) {
    app.route('/label/:labelType') // get all labels of type
    .get(
        // auth.validateToken,
        controller.getLabels,
        )
    .post( // post new label of type
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        controller.createLabel,
        );
    app.route('/label/:labelType/:name')
    .get( // get label of type and name
        // auth.validateToken,
        controller.getLabel,
        )
    .put( // modify label of type and name
        // auth.validateToken,
        controller.modifyLabel,
        );
}

module.exports = {
    routes,
}