const jwt = require('jsonwebtoken');

const env = require('../env.js');
const userModel = require('./user.model.js');

const {jwtSecret} = env;

async function login(req, res) {
  const {username, password} = req.body;
  try {
    const loginResult = await userModel.login(username, password);
    const token = jwt.sign(loginResult, jwtSecret);
    return res.json({
      token,
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      message: err.error.error,
    });
  }
}

async function logout(req, res) {
  const user = req.user;
  try {
    const logoutResult = await userModel.logout(user.sessionToken);
    return res.status(200).json({
      message: 'Logged out',
    });
  } catch (err) {
    return res.status(err.statusCode).json({
      message: err.error.error,
    });
  }
}

module.exports = {
  login,
  logout,
}
