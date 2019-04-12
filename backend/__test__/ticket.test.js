const ticketModel = require('../__mocks__/ticket.model');
// jest.mock('./ticket.model');
const {ModelError} = require('../error');

describe('create ticket tests', () => {
    //createTicket(title,body,creator,attachments)
    test('NORMAL TEST CASE', async() => { // need to be mocked
        const response = await ticketModel.createTicket('ticket title','ticket content','0p1maitmtS','[attachmenturl.com]');
        expect(response.objectId).toBeDefined();
    });
    test('error message if empty title', async() => {
        await expect(ticketModel.createTicket('','ticket content','0p1maitmtS','[]'))
        .rejects.toThrow('Missing fields');
    });
    test('error message if empty title and/or body', async() => {
        await expect(ticketModel.createTicket('','','0p1maitmtS','[]'))
        .rejects.toThrow('Missing fields');
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.createTicket())
        .rejects.toThrow('Missing fields');
    });
});

describe('GET TICKETS OF USER TESTS', () => {
    //getUserTickets(userId)
    test('normal test case', async() => {
        const response = await ticketModel.getUserTickets('0p1maitmtS');
        expect(response[0]).toBeDefined();
    });
    test('non-existent user test case', async() => {
        const response = await ticketModel.getUserTickets('fakeId');
        expect(response[0]).toBeUndefined();
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.getUserTickets())
        .rejects.toThrow('Missing fields');
    });
});

describe('GET TICKETS BY LABELTYPE & LABELNAME', () => {
    //getLabelTickets(labelType, labelId)
    test('normal test case', async() => {
        const response = await ticketModel.getLabelTickets('status', 'e0WoclRcZV');
        expect(response.length).toBeGreaterThan(0);
    });
    test('error message if invalid labelType', async() => {
        await expect(ticketModel.getLabelTickets('wrongType','e0WoclRcZV'))
        .rejects.toThrow('Invalid labelType');
    });
    test('non-existent label test case', async() => {
        await expect(ticketModel.getLabelTickets('status','fakeId'))
        .rejects.toThrow('Invalid labelId');
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.getLabelTickets())
        .rejects.toThrow('Missing fields');
    });
})

describe('GET ALL TICKETS (ADMIN) TESTS', () => {
    //getAllTickets()
    test('normal test case', async() => {
        const response = await ticketModel.getAllTickets();
        expect(response.length).toBeGreaterThan(0);
    });
});

describe('GET TICKET BY TICKETID TESTS', () => {
    //getTicket(ticketId)
    test('normal test case', async() => {
        const response = await ticketModel.getTicket('a4fkG6138D');
        expect(response.objectId).toBe('a4fkG6138D');
    });
    test('return error if non-existent ticketId', async() => {
        const response = await ticketModel.getTicket('fakeId');
        expect(response).toEqual(new ModelError(101, 'Object not found'));
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.getTicket())
        .rejects.toThrow('Missing fields');        
    });
});

describe('MODIFY TICKET TESTS', () => {
    //modifyTicket(ticketId,data)
    test('normal test case', async() => {
        const response = await ticketModel.modifyTicket('xebASqhYJE',{'status':'closed'});
        expect(response.updatedAt).toBeDefined();
    });
    test('return error if non-existent ticketId', async() => {
        const response = await ticketModel.modifyTicket('fakeId',{'status':'closed'});
        expect(response).toEqual(new ModelError(101, 'Object not found'));
    });
    test('error message if empty data', async() => {
        await expect(ticketModel.modifyTicket('xebASqhYJE',''))
        .rejects.toThrow('Missing fields');
    });
    test('error message if empty key', async() => {
        await expect(ticketModel.modifyTicket('xebASqhYJE',{'':'sdf'}))
        .rejects.toThrow('Invalid key value');
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.modifyTicket())
        .rejects.toThrow('Missing fields');        
    });
});

describe('CLOSE TICKET TESTS', () => {
    //closeTicket(ticketId)
    test('normal test case', async() => {
        const response = await ticketModel.closeTicket('JDHZkqA6nZ');
        expect(response.updatedAt).toBeDefined();
    });
    test('return error if non-existent ticketId', async() => {
        const response = await ticketModel.closeTicket('fakeId');
        expect(response).toEqual(new ModelError(101, 'Object not found'));
    });
    test('error message if missing fields', async() => {
        await expect(ticketModel.closeTicket())
        .rejects.toThrow('Missing fields');        
    });
});