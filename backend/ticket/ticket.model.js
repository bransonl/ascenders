const request = require('request-promise-native');
const env = require('../env.js');

const {apiEndpoint, sharedHeaders} = env;
const ticketsClassPath = `${apiEndpoint}/classes/tickets`;

async function createTicket(title,body,creator,attachments) {
    if (!title || !body || !creator || !attachments) {
        throw new Error('Missing fields');
    }
    const options = { // header of API request to ACNAPI
        method: 'POST',
        uri: ticketsClassPath,
        headers: sharedHeaders,
        body: {
            title,
            body,
            creator,
            attachments,
            status: 'open',
        },
        json: true,
    }
    return await request(options);
}

async function getTickets(userId) {
    if (!userId) {
        throw new Error('Missing fields');
    }
    try {
        const options = {
            method: 'GET',
            uri: ticketsClassPath,
            qs: {
                where: `{"creator":"${userId}"}`,
                // how to check for admin
            },
            headers: sharedHeaders,
        };
        return await request(options);
    } catch (err) {
        console.log("model error");
    }
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new Error('Missing fields');
    }
    const options = {
        method: 'GET',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
    }
    return await request(options);
}

async function modifyTicket(ticketId,data) {
    if (!ticketId || !data) {
        throw new Error('Missing fields');
    }
    const options = {
        method: 'PUT', 
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: data,
    };
    return await request(options);
}

// changes ticket status to 'closed'
async function closeTicket(ticketId) {
    if (!ticketId) {
        throw new Error('Missing fields');
    }
    const options = {
        method: 'PUT',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: {status: 'closed'}
    };
    return await request(options);
}


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
    closeTicket,

    // getTags,
    // createTag,
    // getPriorities,
    // createPriority,
    // getStatuses,
    // createStatus,
}