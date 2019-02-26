const userModel = require('./user.model.js');

async function login(req, res) {
  const {username, password} = req.body;
  const loginResult = await userModel.login(username, password);
  res.send(loginResult);
}

function logout(req, res) {
}

module.exports = {
  login,
  logout,
}
