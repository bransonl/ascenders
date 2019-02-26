const jwt = require('jsonwebtoken');

const env = require('./env.js');

const {jwtSecret} = env;

function validateToken(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).json({
      message: 'Missing token',
    });
  }
  const splitToken = tokenHeader.split(' ');
  if (splitToken[0] === 'Bearer') {
    const token = splitToken[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid token',
        })
      }
      req.user = decoded;
      next();
    })
  }
}

module.exports = {
  validateToken,
}