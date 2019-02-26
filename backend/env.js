const apiEndpoint = 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common';
const serverToken = process.env.ACNAPI_SERVER_TOKEN;
const sharedHeaders = {
  'Content-Type': 'application/json',
  'Server-Token': serverToken,
};

module.exports = {
    apiEndpoint,
    serverToken,
    sharedHeaders,
}