const auth = require('../auth.js');
const labelModel = require('./label.model');
const {LabelController} = require('./label.controller');

const labelController = new LabelController(labelModel);

function routes(app) {
    app.route('/label/:labelType') // get all labels of type
    .get(
        // auth.validateToken,
        labelController.getLabels,
        )
    .post( // post new label of type
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        labelController.createLabel,
        );
        
    app.route('/label/:labelType/:labelName')
    .get( // get label of type and name
        // auth.validateToken,
        labelController.getLabel,
        )
    
    app.route('/label/:labelType/:labelName')    
    .put(
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        labelController.modifyLabel,
        );
    app.route('/labelc/:labelType/:labelName')    
    .put(
        // auth.validateToken,
        // auth.createRoleCheck('admin'),
        labelController.modifyLabelc,
        );
}

module.exports = {
    routes,
}