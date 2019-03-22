const apiEndpoint = 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common';
const serverToken = process.env.ACNAPI_SERVER_TOKEN;
const sharedHeaders = {
  'Content-Type': 'application/json',
  'Server-Token': serverToken,
};
const jwtSecret = process.env.JWT_SECRET;
const secretAccessKey = process.env.ACN_SECRET_ACCESS_KEY;
const accessKeyId = process.env.ACN_ACCESS_KEY_ID;

module.exports = {
    apiEndpoint,
    jwtSecret,
    serverToken,
    sharedHeaders,
    secretAccessKey,
    accessKeyId,
}