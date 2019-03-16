const request = require('request-promise-native');
const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = env;

async function login(username, password) {
  console.log(`login: ${username}, ${password}`);
  console.log(sharedHeaders);
  const options = {
    method: 'GET',
    uri: `${apiEndpoint}/login`,
    qs: {
      username,
      password,
    },
    headers: sharedHeaders,
    json: true,
  }
  return await request(options);
}

async function logout(usename, sessionToken) {

}

module.exports = {
  login,
  logout,
}
