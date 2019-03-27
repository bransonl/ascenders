const ticketModel = require('../ticket/ticket.model');

describe('create ticket tests', async() => {
    //createTicket(title,body,creator,attachments)
    test('normal test case', async() => { // need to be mocked
        const response = await ticketModel.createTicket('ticket title','ticket content','user1','[attachmenturl.com]');
        expect(response.objectId).toBeDefined();
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.createTicket())
        .rejects.toThrow('Missing fields');
    });
    test('error message if empty title', async() => {
        await expect(ticketModel.createTicket('','ticket content','user1','[]'))
        .rejects.toThrow('Missing fields');
    });
    test('error message if empty title and/or body', async() => {
        await expect(ticketModel.createTicket('','','user1','[]'))
        .rejects.toThrow('Missing fields');
    });
});

describe('get tickets of user tests', async() => {
    //getTickets(userId)
    test('normal test case', async() => {
        const response = await ticketModel.getTickets('0p1maitmtS');
        expect(response).toContain('results');
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.getTickets())
        .rejects.toThrow('Missing fields');
    });
});

describe('get ticket by ticketId', async() => {
    //getTicket(ticketId)
    test('normal test case', async() => {
        const response = await ticketModel.getTicket('xebASqhYJE');
        expect(response).toContain('"objectId":"xebASqhYJE"');
    });
    
    test('error message if non-existent ticketId', async() => {
        await expect(ticketModel.getTicket('fakeId'))
        .rejects.toThrow('404 - \"{\\\"code\\\":101,\\\"error\\\":\\\"Object not found.\\\"}\"');
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.getTicket())
        .rejects.toThrow('Missing fields');        
    });
});

describe('modify ticket tests', async() => {
    //modifyTicket(ticketId,data)
    test('normal test case', async() => {
        const response = await ticketModel.modifyTicket('xebASqhYJE',{'status':'closed'});
        expect(response.updatedAt).toBeDefined();
    });
    test('error message if non-existent ticketId', async() => {
        await expect(ticketModel.modifyTicket('fakeId',{'status':'closed'}))
        .rejects.toThrow('404 - {\"code\":101,\"error\":\"Object not found.\"}');
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.modifyTicket())
        .rejects.toThrow('Missing fields');        
    });
    test('error message if empty data', async() => {
        await expect(ticketModel.modifyTicket('xebASqhYJE',''))
        .rejects.toThrow('Missing fields');
    });
});

describe('close ticket tests', async() => {
    //closeTicket(ticketId)
    test('normal test case', async() => {
        const response = await ticketModel.closeTicket('JDHZkqA6nZ');
        expect(response.updatedAt).toBeDefined();
    });
    test('error message if non-existent ticketId', async() => {
        await expect(ticketModel.closeTicket('fakeId2'))
        .rejects.toThrow();
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.closeTicket())
        .rejects.toThrow('Missing fields');        
    });
});