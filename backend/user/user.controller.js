const userModel = require('./user.model.js');

function hello(req, res) {
  const user = userModel.getUserById(req.params.id);
  res.send(`hello ${user.name} with id ${user.id}`);
}

module.exports = {
  hello,
}
