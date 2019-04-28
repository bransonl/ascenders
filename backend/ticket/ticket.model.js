const request = require('request-promise-native');

const {apiEndpoint, sharedHeaders} = require('../env.js');
const {ModelError} = require('../error');
const ticketsClassPath = `${apiEndpoint}/classes/tickets`;

async function createTicket(title,body,creator,attachments) {
    if (!title | !body | !creator) {
        throw new ModelError(500, 'Missing fields');
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
    try {
        return await request(options);
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getUserOpenTickets(username) {
    if (!username) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: {
                creator: username,
                status: 'open'
            },
        },
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getUserClosedTickets(username) {
    if (!username) {
        throw new ModelError(400, 'Missing fields');
    }
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: {
                creator: username,
                status: 'closed'
            },
        },
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getLabelTickets(labelType, labelName) {
    if (!labelType | !labelName) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        qs: {
            where: `{"${labelType}":"${labelName}"}`,
        },
        headers: sharedHeaders,
    };
    try {
        return JSON.parse(await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getAllOpenTickets() {
    const options1 = {
        method: 'GET',
        uri: ticketsClassPath,
        headers: sharedHeaders,
        json: true,
        qs: {
            where: {
                status: 'open'
            },
        },
    };
    const options2 = {
        method: 'GET',
        uri: ticketsClassPath,
        headers: sharedHeaders,
        json: true,
        qs: {
            where: {
                status: 'in-progress'
            },
        },
    };
    try {
        const open = (await request(options1)).results;
        const prog = (await request(options2)).results;
        return open + prog;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getAllClosedTickets() {
    const options = {
        method: 'GET',
        uri: ticketsClassPath,
        headers: sharedHeaders,
        json: true,
        qs: {
            where: {
                status: 'closed'
            },
        },
    };
    try {
        return (await request(options)).results;
    } catch (err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(500, 'Invalid ticketId');
    }
    const options = {
        method: 'GET',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
    }
    try {
        return await request(options);
    } catch(err) {
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function modifyTicket(ticketId, data) {
    if (!ticketId | !data) {
        throw new ModelError(500,'Missing fields');
    }
    else if (ticketId.length != 10) {
        throw new ModelError(500, 'Invalid ticketId');
    }
    const keys = Object.keys(data);
    for (i=0; i<keys.length; i++) {
        if (keys[i].length == 0) {
            throw new ModelError(500, 'Invalid key value');
        }
    }
    const options = {
        method: 'PUT',
        uri: `${ticketsClassPath}/${ticketId}`,
        headers: sharedHeaders,
        json: true,
        body: data,
    };
    try {
        return await request(options);
    } catch(err) {
        console.log(err);
        throw new ModelError(err.statusCode, err.error.error);
    }
}

async function deleteAllTickets() {
    const openTickets = await getAllOpenTickets();
    const closedTickets = await getAllClosedTickets();
    const tickets = openTickets.concat(closedTickets);
    tickets.map(ticket => {
        const options = {
            method: 'DELETE',
            uri: `${ticketsClassPath}/${ticket.objectId}`,
            headers: sharedHeaders,
            json: true,
        };
        return request(options);
    });
    await Promise.all(tickets);
    return;
}

module.exports = {
    createTicket,
    getUserOpenTickets,
    getUserClosedTickets,
    getLabelTickets,
    getAllOpenTickets,
    getAllClosedTickets,
    getTicket,
    modifyTicket,
}
