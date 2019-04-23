class UserPreferenceController {
    constructor(models = []) {
        this._model = Object.assign({}, ...models);

        this.getUserPreference = this.getUserPreference.bind(this);
        this.updateUserPreference = this.updateUserPreference.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
    }

    async getUserPreference(req, res) {
        const {username} = req.params;
        if (req.user.role !== 'admin' && req.user.username !== username) {
            return res.status(403).json({
                message: 'Forbidden to get another user\'s preferences',
            });
        }
        try {
            return res.json(await this._model.getUserPreferenceForUser(username));
        } catch (err) {
            return res.status(err.statusCode).json(err.toJSON());
        }
    }

    async updateUserPreference(req, res) {
        const {username} = req.params;
        if (req.user.role !== 'admin' && req.user.username !== username) {
            return res.status(403).json({
                message: 'Forbidden to modify another user\'s preferences',
            });
        }
        try {
            return res.json(await this._model.updateUserPreferenceForUser(username, req.body));
        } catch (err) {
            return res.status(err.statusCode).json(err.toJSON());
        }
    }

    async uploadProfile(req, res) {
        const {username} = req.params;
        const profile = req.fileURL;
        if (req.user.role !== 'admin' && req.user.username !== username) {
            return res.status(403).json({
                message: 'Forbidden to modify another user\'s preferences',
            });
        }
        console.log(username,profile);
        try {
            return res.json(await this._model.updateUserPreferenceForUser(username, {profile:profile}));
        } catch (err) {
            console.error(err)
            return res.status(err.statusCode).json(err);
        }
    }
}

module.exports = UserPreferenceController;
