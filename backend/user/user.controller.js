const jwt = require('jsonwebtoken');

class UserController {
    constructor(model, jwtSecret) {
        this._model = model;
        this._jwtSecret = jwtSecret;

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req, res) {
        const {username, password} = req.body;
        try {
            const loginResult = await this._model.login(username, password);
            try {
                const token = jwt.sign(loginResult, this._jwtSecret);
                return res.json({token});
            } catch (err) { // Catch possible JWT errors
                return res.status(500).send();
            }
        } catch (err) {
            return res.status(err.statusCode).json(err.toJSON());
        }
    }

    async logout(req, res) {
        const user = req.user;
        try {
            const logoutResult = await this._model.logout(user.sessionToken);
            return res.json({message: 'Logged out'});
        } catch (err) {
            return res.status(err.statusCode).json(err.toJSON());
        }
    }

    async register(req, res) {
        const {username, password, role} = req.body;
        if (!username || !password || !role) {
            const fieldsMissing = [];
            if (!username) {
                fieldsMissing.push('username');
            }
            if (!password) {
                fieldsMissing.push('password');
            }
            if (!role) {
                fieldsMissing.push('role');
            }
            return res.status(400).json({
                message: `Missing ${fieldsMissing.join(', ')}`,
            });
        }
        try {
            const registerResult = await this._model.register(req.body);
            return res.json(registerResult);
        } catch (err) {
            return res.status(err.statusCode).json(err.toJSON());
        }
    }
}

async function register(req, res) {
    const {username, password, role, ...rest} = req.body;
    if (!username || !password || !role) {
        const fieldsMissing = [];
        if (!username) {
        fieldsMissing.push('username');
        }
        if (!password) {
        fieldsMissing.push('password');
        }
        if (!role) {
        fieldsMissing.push('role');
        }
        return res.status(400).json({
        message: `Missing ${fieldsMissing.join(', ')}`,
        });
    }
    try {
        const registerResult = await userModel.register(req.body);
        return res.json(registerResult);
    } catch (err) {
        return res.status(err.statusCode).json({
            message: err.error.error,
        });
    }
}

module.exports = {
    UserController
}
