const jwt = require('jsonwebtoken');

const env = require('../env.js');
const userModel = require('./user.model.js');

const {jwtSecret} = env;

async function login(req, res) {
  const {username, password} = req.body;
  console.log('login', username, password);
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
  login,
  logout,
  register,
}
