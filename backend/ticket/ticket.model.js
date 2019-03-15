const request = require('request-promise-native');
const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = env;

async function createTicket(data) {
    const options = { // header of API request to ACNAPI
        method: 'POST',
        uri: `${apiEndpoint}/classes/ticket`,
        headers: sharedHeaders,
        body: data,
        json: true,
    }
    return await request(options);
}

async function getTickets(userId) {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/classes/ticket/`,
        qs: {
            creator: userId,
            // how to check for admin
        },
        headers: sharedHeaders,
    };
    return await request(options);
}

async function getTicket(ticketId) {
    const options = {
        method: 'GET',
        uri: `${apiEndpoint}/classes/ticket/${ticketId}`,
        headers: sharedHeaders,
    }
    return await request(options);
}

async function modifyTicket(ticketId,data) {
    const options = {
        method: 'PUT', 
        uri: `${apiEndpoint}/classes/ticket/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: data,
    };
    return await request(options);
}

// // changes ticket status to 'closed'
// async function deleteTicket(ticketId) {
//     const options = {
//         method: 'PUT',
//         uri: `${apiEndpoint}/classes/ticket/${ticketId}`,
//         headers: sharedHeaders,
//         body: {status: closed}
//     };
//     return await request(options);
// }


// async function getTags() {
//     const options = {
//         method = 'GET',
//         uri: `${apiEndpoint}/classes/tag`,
//         headers: sharedHeaders,
//     };
//     return await request(options);
// }

// //create new type of tag for ticket
// async function createTag(name) {
//     const options = {
//         method = 'POST',
//         uri: `${apiEndpoint}/classes/tag`,
//         headers: sharedHeaders,
//         json: true,
//         body: {
//             name,
//         }
//     };
//     return await request(options);
// }

// async function getPriorities() {
//     const options = {
//         method = 'GET',
//         uri: `${apiEndpoint}/classes/priority`,
//         headers: sharedHeaders,
//     };
//     return await request(options);
// }

// //create new type of priority for ticket
// async function createPriority(name,colour) {
//     const options = {
//         method = 'POST',
//         uri: `${apiEndpoint}/classes/priority`,
//         headers: sharedHeaders,
//         json: true,
//         body: {
//             name,
//             colour,
//         },
//     };
//     return await request(options);
// }

// async function getStatuses() {
//     const options = {
//         method = 'GET',
//         uri: `${apiEndpoint}/classes/status`,
//         headers: sharedHeaders,
//     };
//     return await request(options);
// }

// //create new type of status for ticket
// async function createStatus(name,colour) {
//     const options = {
//         method = 'POST',
//         uri: `${apiEndpoint}/classes/status`,
//         headers: sharedHeaders,
//         json: true,
//         body: {
//             name,
//             colour,
//         },
//     };
//     return await request(options);
// }


module.exports = {
    createTicket,
    getTickets,
    getTicket,
    modifyTicket,
    // deleteTicket,

    // getTags,
    // createTag,
    // getPriorities,
    // createPriority,
    // getStatuses,
    // createStatus
}