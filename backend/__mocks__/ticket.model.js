const {ModelError} = require('../error');

async function createTicket(title,body,creator,attachments) {
    if (!title | !body | !creator) {
        throw new ModelError(500, 'Missing fields');
    }
    const response = `{
        "objectId": "NSb0VjTsDG",
        "createdAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
}

async function getUserOpenTickets(username) {
    if (!username) {
        throw new ModelError(400, 'Missing fields');
    }
    if (username == 'fakeId') {
        return Promise.resolve([]);
    }
    results = [
        {
            objectId: "WgwiDEiyUT",
            title: "hello ticket",
            body: "ticket says hello",
            creator: username,
            attachments: "link.org",
            status: "open",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "high"
        },
        {
            objectId: "NRfKgdEDo2",
            title: "hello hello",
            body: "ticket says wasssup",
            creator: username,
            attachments: "link.org, someotherlink.c",
            status: "open",
            createdAt: "2019-04-04T19:26:41.963Z",
            updatedAt: "2019-04-04T19:26:41.963Z"
        }
    ]
    return Promise.resolve(results);
}

async function getUserClosedTickets(username) {
    if (!username) {
        throw new ModelError(400, 'Missing fields');
    }
    if (username == 'fakeId') {
        return Promise.resolve([]);
    }
    results = [
        {
            objectId: "WgwiDEiyUT",
            title: "hello ticket",
            body: "ticket says hello",
            creator: username,
            attachments: "link.org",
            status: "open",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "high"
        },
        {
            objectId: "NRfKgdEDo2",
            title: "hello hello",
            body: "ticket says wasssup",
            creator: username,
            attachments: "link.org, someotherlink.c",
            status: "open",
            createdAt: "2019-04-04T19:26:41.963Z",
            updatedAt: "2019-04-04T19:26:41.963Z"
        }
    ]
    return Promise.resolve(results);
}

async function getLabelTickets(labelType, labelName) {
    if (!labelType | !labelName) {
        throw new ModelError(500, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(500, 'Invalid labelType');
    }
    if (labelName == 'fakeId'){
        return Promise.resolve([]);
    }
    else if (labelType = 'priority', labelName == 'high') {
        results = [
            {
                objectId: "WgwiDEiyUT",
                title: "hello ticket",
                body: "ticket says hello",
                creator: "cmextramexs",
                attachments: "link.org",
                status: "open",
                tag: "S9Zo7fsQfI",
                priority: "high",
                createdAt: "2019-04-04T19:26:17.043Z",
                updatedAt: "2019-04-05T02:31:19.137Z",
            },
            {
                objectId: "NRfKgdEDo2",
                title: "hello hello",
                body: "ticket says wasssup",
                creator: "cmetramexs",
                attachments: "link.org, someotherlink.c",
                status: "open",
                priority: "high",
                createdAt: "2019-04-04T19:26:41.963Z",
                updatedAt: "2019-04-04T19:26:41.963Z",
            }
        ]
        return Promise.resolve(results);
    }
}

async function getAllOpenTickets() {
    results = [
        {
            objectId: "WgwiDEiyUT",
            title: "hello ticket",
            body: "ticket says hello",
            creator: "cmetramexs",
            attachments: "link.org",
            status: "open",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "high"
        },
        {
            objectId: "NRfKgdEDo2",
            title: "hello hello",
            body: "ticket says wasssup",
            creator: "cmetramexs",
            attachments: "link.org, someotherlink.c",
            status: "open",
            createdAt: "2019-04-04T19:26:41.963Z",
            updatedAt: "2019-04-04T19:26:41.963Z"
        },
        {
            objectId: "a4fkG6138D",
            title: "ticket title",
            body: "hello, this is a dummy ticket",
            creator: "branson_admin",
            attachments: "s3-services.com/image.png, sudiptabest.com/file.pdf",
            status: "in-progress",
            priority: "72H9e0c19v",
            createdAt: "2019-04-05T02:35:55.610Z",
            updatedAt: "2019-04-05T02:36:26.099Z",
        }
    ]
    return Promise.resolve(results);
}

async function getAllClosedTickets() {
    results = [
        {
            objectId: "WgwiDEiyUT",
            title: "hello ticket",
            body: "ticket says hello",
            creator: "cmetramexs",
            attachments: "link.org",
            status: "closed",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "high"
        },
        {
            objectId: "NRfKgdEDo2",
            title: "hello hello",
            body: "ticket says wasssup",
            creator: "cmetramexs",
            attachments: "link.org, someotherlink.c",
            status: "closed",
            createdAt: "2019-04-04T19:26:41.963Z",
            updatedAt: "2019-04-04T19:26:41.963Z"
        },
        {
            objectId: "a4fkG6138D",
            title: "ticket title",
            body: "hello, this is a dummy ticket",
            creator: "branson_admin",
            attachments: "s3-services.com/image.png, sudiptabest.com/file.pdf",
            status: "closed",
            priority: "72H9e0c19v",
            createdAt: "2019-04-05T02:35:55.610Z",
            updatedAt: "2019-04-05T02:36:26.099Z",
        }
    ]
    return Promise.resolve(results);
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400, 'Missing fields');
    }
    if (ticketId == 'fakeId') {
        throw new ModelError(404, 'Object not found');
    }
    results = [
        {
            objectId: `${ticketId}`,
            title: "hello ticket",
            body: "ticket says hello",
            creator: "cmetramexs",
            attachments: "link.org",
            status: "closed",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "high"
        }
    ]
    return Promise.resolve(results);
}

async function modifyTicket(ticketId, data) {
    if (!ticketId | !data) {
        throw new ModelError(500,'Missing fields');
    }
    const keys = Object.keys(data);
    for (i=0; i<keys.length; i++) {
        if (keys[i].length == 0) {
            throw new ModelError(500, 'Invalid key value');
        }
    }
    if (ticketId == 'fakeId') {
        throw new ModelError(500, 'Invalid ticketId');
    }
    const response = `{
        "updatedAt": "2019-04-07T04:49:07.323Z"
    }`
    return Promise.resolve(JSON.parse(response));
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
