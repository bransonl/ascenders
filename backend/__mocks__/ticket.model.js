const {ModelError} = require('../error');

async function createTicket(title, body, creator, attachments) {
    if (!title || !body || !creator) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (creator.length != 10) {
        throw new ModelError(400, 'Invalid userId');
    }
    if (!attachments) {
        attachments = '';
    }
    const response = `{
        "objectId": "NSb0VjTsDG",
        "createdAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
}

async function getUserTickets(userId) {
    let response;
    if (!userId) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (userId.length == 10) {
        response = `{
            "results": [
                {
                    "objectId": "WgwiDEiyUT",
                    "title": "hello ticket",
                    "body": "ticket says hello",
                    "creator": "${userId}",
                    "attachments": "link.org",
                    "status": "e0WoclRcZV",
                    "createdAt": "2019-04-04T19:26:17.043Z",
                    "updatedAt": "2019-04-05T02:31:19.137Z",
                    "tag": "S9Zo7fsQfI",
                    "priority": "72H9e0c19v"
                },
                {
                    "objectId": "NRfKgdEDo2",
                    "title": "hello hello",
                    "body": "ticket says wasssup",
                    "creator": "${userId}",
                    "attachments": "link.org, someotherlink.c",
                    "status": "e0WoclRcZV",
                    "createdAt": "2019-04-04T19:26:41.963Z",
                    "updatedAt": "2019-04-04T19:26:41.963Z"
                }
            ]
        }`
    }
    else {
        response = `{
            "results": []
        }`
    }
    return Promise.resolve(JSON.parse(response).results);
}

async function getAllTickets() {
    const response = `{
        "results": [
            {
                "objectId": "WgwiDEiyUT",
                "title": "hello ticket",
                "body": "ticket says hello",
                "creator": "0p1maitmtS",
                "attachments": "link.org",
                "status": "e0WoclRcZV",
                "createdAt": "2019-04-04T19:26:17.043Z",
                "updatedAt": "2019-04-05T02:31:19.137Z",
                "tag": "S9Zo7fsQfI",
                "priority": "72H9e0c19v"
            },
            {
                "objectId": "a4fkG6138D",
                "title": "ticket title",
                "body": "hello, this is a dummy ticket",
                "creator": "0p1maitmtS",
                "attachments": "s3-services.com/image.png, sudiptabest.com/file.pdf",
                "status": "e0WoclRcZV",
                "createdAt": "2019-04-05T02:35:55.610Z",
                "updatedAt": "2019-04-05T02:36:26.099Z",
                "priority": "72H9e0c19v"
            },
            {
                "objectId": "NSb0VjTsDG",
                "title": "ticket title",
                "body": "hello, this is a dummy ticket",
                "creator": "0p1maitmtS",
                "attachments": "s3-services.com/image.png, sudiptabest.com/file.pdf",
                "status": "e0WoclRcZV",
                "createdAt": "2019-04-07T04:49:07.323Z",
                "updatedAt": "2019-04-07T04:49:07.323Z"
            }
        ]
    }`
    return Promise.resolve(JSON.parse(response).results);
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (ticketId.length == 10) {
        const response = `{
            "objectId": "${ticketId}",
            "title": "ticket title",
            "body": "hello, this is a dummy ticket",
            "creator": "0p1maitmtS",
            "attachments": "s3-services.com/image.png, sudiptabest.com/file.pdf",
            "status": "e0WoclRcZV",
            "createdAt": "2019-04-05T02:35:55.610Z",
            "updatedAt": "2019-04-05T02:36:26.099Z",
            "priority": "72H9e0c19v"
        }`
        return Promise.resolve(JSON.parse(response));
    }
    else {
        return new ModelError(101, 'Object not found');
    }
}

async function modifyTicket(ticketId, data) {
    if (!ticketId || !data) {
        throw new ModelError(400,'Missing fields');
    }
    const keys = Object.keys(data);
    for (i=0; i<keys.length; i++) {
        if (keys[i].length == 0) {
            throw new ModelError(400, 'Invalid key value');
        }
    }
    if (ticketId.length == 10) {
        const response = `{    
            "updatedAt": "2019-04-07T06:58:50.730Z"
        }`
        return Promise.resolve(JSON.parse(response));
    }
    else {
        return new ModelError(101, 'Object not found');
    }
}

// changes ticket status to 'closed'
async function closeTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400,'Missing fields');
    }
    if (ticketId.length == 10) {
        const response = `{    
            "updatedAt": "2019-04-07T06:58:50.730Z"
        }`
        return Promise.resolve(JSON.parse(response));
    }
    else {
        return new ModelError(101, 'Object not found');
    }
}

module.exports = {
    createTicket,
    getUserTickets,
    getAllTickets,
    getTicket,
    modifyTicket,
    closeTicket,
}