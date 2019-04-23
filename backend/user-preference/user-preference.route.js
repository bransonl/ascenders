const auth = require('../auth');
const userPreferenceModel = require('./user-preference.model');
const UserPreferenceController = require('./user-preference.controller');

const controller = new UserPreferenceController([userPreferenceModel]);

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
}

module.exports = {
    routes,
};
