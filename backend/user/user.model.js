const request = require('request-promise-native');

const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = env;

async function login(username, password) {
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

async function logout(sessionToken) {
  const options = {
    method: 'POST',
    uri: `${apiEndpoint}/logout`,
    headers: {
      'X-Parse-Session-Token': sessionToken,
      ...sharedHeaders,
    },
    json: true,
  };
  return await request(options);
}

module.exports = {
  login,
  logout,
}
