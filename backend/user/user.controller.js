const jwt = require('jsonwebtoken');

class UserController {
    constructor(models = [], jwtSecret) {
        this._model = Object.assign({}, ...models);
        this._jwtSecret = jwtSecret;

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.getAdmins = this.getAdmins.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    async checkToken(req, res) {
        if (req.user) {
            return res.json(this._model.createUserObject(req.user));
        }
        return res.status(401).json({
            message: 'Invalid token',
        });
    }

    async login(req, res) {
        console.log('login');
        const {username, password} = req.body;
        try {
            const loginResult = await this._model.login(username, password);
            try {
                const token = jwt.sign(loginResult, this._jwtSecret);
                return res.json({token, ...this._model.createUserObject(loginResult)});
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
        const {username, password, role, email} = req.body;
        if (!username || !password || !role || !email) {
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
            if (!email) {
                fieldsMissing.push('email');
            }
            return res.status(400).json({
                message: `Missing ${fieldsMissing.join(', ')}`,
            });
        }
        try {
            const registerResult = await this._model.register(username, password, role);
            res.json(registerResult);
            await this._model.createUserPreferenceForUser(username, {email});
            return res;
        } catch (err) {
            console.error(err);
            return res.status(err.statusCode).json(err.toJSON());
        }
    }

    async getAdmins(req, res) {
        try {
            const getAdminsResult = await this._model.getAdmins();
            return res.status(200).json(getAdminsResult);
        } catch(err) {
            throw res.status(err.statusCode).json(err);
        }
    }

    async getAllUsers(req, res) {
        try {
            const result = await this._model.getAllUsers();
            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            throw res.status(err.statusCode).json(err);
        }
    }
}

module.exports = {
    UserController
}
