const request = require('request-promise-native');
const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = env;

async function createTicket(title, body, creator, attachments) {
    const options = {
        method: 'POST',
        uri: `${apiEndpoint}/classes/ticket`,
        headers: sharedHeaders,
        body: {
            title,
            body,
            creator,
            attachments,
        },
        json: true,
    }
    return await request(options);
}

async function getTicket(objectId) {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/classes/ticket/${objectId}`,
        headers: sharedHeaders,
    }
    return await request(options);
}

async function modifyTicket(objectId) {
    // is there a need to split for user and admin? 
    // is there a need to check for auth here too?
    const options = {
        method: 'PUT', //do we really create a new ticket everytime these change?
        uri: `${apiEndpoint}/classes/ticket`,
        headers:sharedHeaders,
        json: true,
        body: { // what should be the editable fields
            body,
            attachments,
            relevant,
            tag,
            priority,
            status,
        }
    };
    return await request(options);
}

module.exports = {
    createTicket,
    getTicket,
    modifyTicket,
}