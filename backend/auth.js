const jwt = require('jsonwebtoken');

const env = require('./env.js');

const {jwtSecret} = env;

function validateToken(token) {
    const splitToken = token.split(' ');
    if (splitToken[0] === 'Bearer') {
        const token = splitToken[1];
        try {
            return jwt.verify(token, jwtSecret);
        } catch (err) {
            throw err;
        }
    }
}

function validateTokenMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({
            message: 'Missing token',
        });
    }
    try {
        req.user = validateToken(tokenHeader);
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
}

// Assumes JWT token validated using validateToken
function createRoleCheck(role) {
    return function checkRole(req, res, next) {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                message: 'Unauthenticated',
            });
        } else if (user.role !== role) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        next();
    }
}


module.exports = {
    validateToken,
    validateTokenMiddleware,
    createRoleCheck,
}
