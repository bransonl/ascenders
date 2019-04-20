const apiEndpoint = 'https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common';
const serverToken = process.env.ACNAPI_SERVER_TOKEN;
const jwtSecret = process.env.JWT_SECRET;
const secretAccessKey = process.env.ACN_SECRET_ACCESS_KEY;
const accessKeyId = process.env.ACN_ACCESS_KEY_ID;
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const sharedHeaders = {
    'Content-Type': 'application/json',
    'Server-Token': serverToken,
};

module.exports = {
    apiEndpoint,
    jwtSecret,
    serverToken,
    sharedHeaders,
    secretAccessKey,
    accessKeyId,
    sendgridApiKey,
    twilioAccountSid,
    twilioAuthToken,
    twilioPhoneNumber,
}
