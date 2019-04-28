const ticketModel = require('../__mocks__/ticket.model');
const {TicketController} = require('../ticket/ticket.controller');
const {mockRequest, mockResponse} = require('mock-req-res');

const ticketController = new TicketController(ticketModel);

describe('CREATE TICKET TESTS', () => {
    //createTicket(title,body,creator,attachments)
    async function _mockRequest(title, body, creator, attachments) {
        const options = mockRequest({
            body: {
                title,
                body,
                creator,
                attachments},
        });
        return options;
    }
    test('normal test case', async() => {
        const req = _mockRequest('ticket title','ticket content','0p1maitmtS');
        ticketController.createTicket(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });
    test('normal with attachments test case', async() => {
        const req = _mockRequest('ticket title','ticket content','0p1maitmtS','[attachmenturl.com]');
        ticketController.createTicket(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });
    test('error message if empty title', async() => {
        const req = _mockRequest('','ticket content','0p1maitmtS');
        ticketController.createTicket(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
    test('error message if empty title and/or body', async() => {
        const req = _mockRequest('','','0p1maitmtS');
        ticketController.createTicket(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('','ticket content','0p1maitmtS');
        ticketController.createTicket(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('GET USER TICKETS TESTS', () => {
    async function _mockRequest(username) {
        const options = mockRequest({
            user: {
                username},
        });
        return options;
    }
    test('normal (open) test case', async() => {
        const req = _mockRequest('cmetramexs');
        ticketController.getUserOpenTickets(req, async() => {
            expect(res[0].status).toBe('open')
        });
    });
    test('normal (closed) test case', async() => {
        const req = _mockRequest('cmetramexs');
        ticketController.getUserClosedTickets(req, async() => {
            expect(res[0].status).toBe('closed')
        });
    });
});

describe('GET ALL TICKETS TESTS', () => {
    async function _mockRequest() {
        const options = mockRequest({
            user: {
                role: 'admin'},
        });
        return options;
    }
    test('normal (open) test case', async() => {
        const req = _mockRequest();
        ticketController.getAllOpenTickets(req, async() => {
            expect(res[0].status).toBe('open')
        });
    });
    test('normal (closed) test case', async() => {
        const req = _mockRequest();
        ticketController.getAllClosedTickets(req, async() => {
            expect(res[0].status).toBe('closed')
        });
    });
});

describe('GET TICKET BY LABELTYPE AND LABELNAME TESTS', () => {
    async function _mockRequest(labelType, labelName){
        const options = mockRequest({
            body: {
                labelType},
            label: {
                name:labelName},
        });
        return options;
    }
    test('normal (tag) test case', async() => {
        const req = _mockRequest('tag', 'bug report');
        ticketController.getLabelTickets(req, async() => {
            expect(res[0].tag).toBe('bug report');
        });
    });
    test('normal (status) test case', async() => {
        const req = _mockRequest('status', 'open');
        ticketController.getLabelTickets(req, async() => {
            expect(res[0].status).toBe('open');
        });
    });
    test('normal (priority) test case', async() => {
        const req = _mockRequest('priority', 'high');
        ticketController.getLabelTickets(req, async() => {
            expect(res[0].priority).toBe('high');
        });
    });
    test('error message if invalid labelType', async() => {
        const req = _mockRequest('wrongType','open');
        ticketController.getLabelTickets(req, async() => {
            expect().toThrow('Invalid labelType');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('','');
        ticketController.getLabelTickets(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('GET TICKET BY TICKETID TESTS', () => {
    async function _mockRequest(ticketId){
        const options = mockRequest({
            params: {
                ticketId},
        });
        return options;
    }
    test('normal test case', async() => {
        const req = _mockRequest('a4fkG6138D');
        ticketController.getTicket(req, async() => {
            expect(res.objectId).toBe('a4fkG6138D');
        });
    });
    test('error message if non existent ticket', async() => {
        const req = _mockRequest('fakeId');
        ticketController.getTicket(req, async() => {
            expect().toThrow('Object not found');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('');
        ticketController.getTicket(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('MODIFY TICKET TESTS', () => {
    describe('ADD ATTACHMENTS TESTS', () => {
        //addAttachment()
        async function _mockRequest(ticketId, fileURL) {
            const options = mockRequest({
                params: {
                    ticketId},
                fileURL: fileURL,
            });
            return options;
        }
        test('normal test case', async() => {
            const req = _mockRequest('a4fkG6138D','www.attachment.com/attachmentId');
            ticketController.addAttachment(req, async() => {
                expect(res.updatedAt).toBeDefined();
            });
        });
        test('error message if non existent ticket', async() => {
            const req = _mockRequest('fakeId','www.attachment.com/attachmentId');
            ticketController.addAttachment(req, async() => {
                expect().toThrow('Object not found');
            });
        });
    });
    describe('CLOSE TICKET TESTS', () => {
        async function _mockRequest(ticketId) {
            const options = mockRequest({
                params: {
                    ticketId},
            });
            return options;
        }
        //closeTicket()
        test('normal test case', async() => {
            const req = _mockRequest('a4fkG6138D');
            ticketController.closeTicket(req, async() => {
                expect(res.message).toBe('Ticket closed');
            });
        });
        test('error message if non existent ticket', async() => {
            const req = _mockRequest('fakeId');
            ticketController.closeTicket(req, async() => {
                expect().toThrow('Object not found');
            });
        });
    });
    describe('ADD ADMIN TESTS', () => {
        async function _mockRequest(ticketId, username) {
            const options = mockRequest({
                params: {
                    ticketId},
                body: {
                    username},
            });
            return options;
        }
        test('normal test case', async() => {
            const req = _mockRequest('a4fkG6138D', 'branson_admin');
            ticketController.addAdmin(req, async() => {
                expect(res.updatedAt).toBeDefined();
            });
        });
        test('error message if not admin', async() => {
            const req = _mockRequest('a4fkG6138D', 'cmetramexs');
            ticketController.addAdmin(req, async() => {
                expect().toThrow('This user has insufficient permissions');
            });
        });
        test('error message if admin already assigned', async() => {
            const req = _mockRequest('a4fkG6138D', 'branson_admin');
            ticketController.addAdmin(req, async() => {
                expect().toThrow('User already assigned');
            });
        });
        test('error message if non existent user', async() => {
            const req = _mockRequest('a4fkG6138D', 'fakeId');
            ticketController.addAmin(req, async() => {
                expect().toThrow('Object not found');
            });
        });
        test('error message if non existent ticket', async() => {
            const req = _mockRequest('fakeId');
            ticketController.addAmin(req, async() => {
                expect().toThrow('Object not found');
            });
        });
    });
});