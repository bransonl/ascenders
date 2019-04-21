const {ModelError} = require('../error');

async function createTicket(title, body, creator, attachments) {
    if (!title || !body || !creator) {
        throw new ModelError(400, 'Missing fields');
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

async function getUserTickets(username) {
    if (!username) {
        throw new ModelError(400, 'Missing fields');
    }
    if (username === 'fakeId') {
        return Promise.resolve([]);
    }
    results = [
        {
            objectId: "WgwiDEiyUT",
            title: "hello ticket",
            body: "ticket says hello",
            creator: username,
            attachments: "link.org",
            status: "e0WoclRcZV",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "72H9e0c19v"
        },
        {
            objectId: "NRfKgdEDo2",
            title: "hello hello",
            body: "ticket says wasssup",
            creator: username,
            attachments: "link.org, someotherlink.c",
            status: "e0WoclRcZV",
            createdAt: "2019-04-04T19:26:41.963Z",
            updatedAt: "2019-04-04T19:26:41.963Z"
        }
    ]
    return Promise.resolve(results);
}

async function getLabelTickets(labelType, labelId) {
    if (!labelType | labelId) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (labelType!='tag' & labelType!='status' & labelType!='priority') {
        throw new ModelError(400, 'Invalid labelType');
    }
    else if (labelId.length != 10) {
        throw new ModelError(400, 'Invalid labelId');
    }
    const results = [
        {
            objectId: "Ak1o4Y8F8D",
            title: "try me again",
            body: "are you working please",
            creator: "branson_admin",
            attachments: "https://ascenders-accenture.s3.ap-southeast-1.amazonaws.com/1554201775774.jpg",
            status: "e0WoclRcZV",
            createdAt: "2019-04-02T10:42:56.000Z",
            updatedAt: "2019-04-02T10:42:56.204Z"
        },
        {
            objectId: "mBFmUiEFkC",
            title: "help help",
            body: "help help help",
            creator: "branson_admin",
            attachments: "https://ascenders-accenture.s3.amazonaws.com/1554202836698.jpg",
            status: "e0WoclRcZV",
            createdAt: "2019-04-02T11:00:36.927Z",
            updatedAt: "2019-04-02T11:00:37.544Z"
        },
        {
            objectId: "6UmzJbhCgx",
            title: "faaak",
            body: "help me pls",
            creator: "branson_admin",
            attachments: "https://ascenders-accenture.s3.ap-southeast-1.amazonaws.com/1554203303768.jpg",
            status: "e0WoclRcZV",
            createdAt: "2019-04-02T11:08:24.015Z",
            updatedAt: "2019-04-02T11:08:24.287Z"
        }
    ];
    return Promise.resolve(results);
}

async function getAllTickets() {
    const results = [
        {
            objectId: "WgwiDEiyUT",
            title: "hello ticket",
            body: "ticket says hello",
            creator: "branson_admin",
            attachments: "link.org",
            status: "e0WoclRcZV",
            createdAt: "2019-04-04T19:26:17.043Z",
            updatedAt: "2019-04-05T02:31:19.137Z",
            tag: "S9Zo7fsQfI",
            priority: "72H9e0c19v"
        },
        {
            objectId: "a4fkG6138D",
            title: "ticket title",
            body: "hello, this is a dummy ticket",
            creator: "branson_admin",
            attachments: "s3-services.com/image.png, sudiptabest.com/file.pdf",
            status: "e0WoclRcZV",
            createdAt: "2019-04-05T02:35:55.610Z",
            updatedAt: "2019-04-05T02:36:26.099Z",
            priority: "72H9e0c19v"
        },
        {
            objectId: "NSb0VjTsDG",
            title: "ticket title",
            body: "hello, this is a dummy ticket",
            creator: "branson_admin",
            attachments: "s3-services.com/image.png, sudiptabest.com/file.pdf",
            status: "e0WoclRcZV",
            createdAt: "2019-04-07T04:49:07.323Z",
            updatedAt: "2019-04-07T04:49:07.323Z"
        }
    ]
    return Promise.resolve(results);
}

async function getTicket(ticketId) {
    if (!ticketId) {
        throw new ModelError(400, 'Missing fields');
    }
    else if (ticketId.length == 10) {
        const response = {
            objectId: ticketId,
            title: "ticket title",
            body: "hello, this is a dummy ticket",
            creator: "branson_admin",
            attachments: "s3-services.com/image.png, sudiptabest.com/file.pdf",
            status: "e0WoclRcZV",
            createdAt: "2019-04-05T02:35:55.610Z",
            updatedAt: "2019-04-05T02:36:26.099Z",
            priority: "72H9e0c19v"
        };
        return Promise.resolve(response);
    }
    else {
        return new ModelError(404, 'Ticket not found');
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
        const response = {
            "updatedAt": "2019-04-07T06:58:50.730Z"
        };
        return Promise.resolve(response);
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
        const response = {
            updatedAt: "2019-04-07T06:58:50.730Z"
        };
        return Promise.resolve(response);
    }
    else {
        return new ModelError(101, 'Object not found');
    }
}

module.exports = {
    createTicket,
    getUserTickets,
    getLabelTickets,
    getAllTickets,
    getTicket,
    modifyTicket,
    closeTicket,
}
