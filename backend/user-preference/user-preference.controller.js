class UserPreferenceController {
    constructor(models = []) {
        this._model = Object.assign({}, ...models);

        this.getUserPreference = this.getUserPreference.bind(this);
        this.updateUserPreference = this.updateUserPreference.bind(this);
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
            return res.status(500).json(err);
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
            return res.status(500).json(err);
        }
    }
}

module.exports = UserPreferenceController;
