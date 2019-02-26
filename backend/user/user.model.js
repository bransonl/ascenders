const request = require('request-promise-native');

const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = require('../env.js');

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
  };
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

async function register(data) {
  const options = {
    method: 'POST',
    uri: `${apiEndpoint}/users`,
    headers: sharedHeaders,
    body: data,
    json: true,
  };
  return await request(options);
}

module.exports = {
  login,
  logout,
  register,
}
