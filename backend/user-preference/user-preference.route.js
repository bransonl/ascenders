const auth = require('../auth');
const userPreferenceModel = require('./user-preference.model');
const UserPreferenceController = require('./user-preference.controller');
const awsModel = require('../aws/aws.model');
const {AwsController} = require('../aws/aws.controller');

const controller = new UserPreferenceController([userPreferenceModel]);
const awsController = new AwsController(awsModel);

function routes(app) {
    app.route('/userPreferences/:username')
        .get(
            auth.validateTokenMiddleware,
            controller.getUserPreference,
        )
        .put(
            auth.validateTokenMiddleware,
            controller.updateUserPreference,
        );

    app.route('/users/:username/profile')
        .put(
            auth.validateTokenMiddleware,
            awsController.uploadProfile,
            controller.uploadProfile,
        )
}

module.exports = {
    routes,
};
