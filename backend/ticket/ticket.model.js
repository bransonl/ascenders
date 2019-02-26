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

// async function getTicketbyId(ticketId) {
//     const options = {
//         method: 'GET',
//         uri: `${apiEndpoint}/classes/ticket`,
//         headers: sharedHeaders,
//         qs: {
//             ticketId,
//         },
//         json: true,
//     }
//     return await request(options);
// }

// async function getTicketbyTitle(title) {
//     const options = {
//         method: 'GET',
//         uri: `${apiEndpoint}/classes/ticket`,
//         headers: sharedHeaders,
//         qs: {
//             title,
//         },
//         json: true,
//     }
//     return await request(options);
// }

module.exports = {
    createTicket,
    // getTicketbyId,
    // getTicketbyTitle,
}