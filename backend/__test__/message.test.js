const messageModel = require('../message/message.model');
const messageModelMock = require('../__mocks__/message.model');
const {MessageController} = require('../message/message.controller');
const mockResponse = require('../__mocks__/response');

const messageController = new MessageController([messageModel]);
const mockedMessageController = new MessageController([messageModelMock]);

describe('TEST BEAUTIFY DATE', () => {
    test('test beautify date', () => {
        const messages = [{
            createdAt: messageModelMock.sampleTimestamp,
            updatedAt: messageModelMock.sampleTimestamp,
        }];
        const beautified = messageController._beautifyDate(messages);
        expect(beautified[0].createdAt).toBe(messageModelMock.sampleBeautifiedTimestamp);
        expect(beautified[0].updatedAt).toBe(messageModelMock.sampleBeautifiedTimestamp);
    })
})

describe('VALID CASES WITH MOCKED MODEL', () => {
    beforeEach(() => {
        messageModelMock.init();
    })

    test('add message to ticket with no messages', async () => {
        const ticketId = 123;
        const message = 'hello';
        const sender = 'bob';
        const expected = {
            messages: [{
                ticketId,
                message,
                sender,
                createdAt: messageModelMock.sampleBeautifiedTimestamp,
                updatedAt: messageModelMock.sampleBeautifiedTimestamp,
            }]
        };
        const req = {
            params: {ticketId},
            body: {message},
            user: {username: sender},
        };
        const res = mockResponse();
        await mockedMessageController.addCommentToTicket(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        await mockedMessageController.getCommentsByTicket(req, res);
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('get empty comments', async () => {
        const expected = {messages:[]};
        const req = {params: {ticketId: 123}};
        const res = mockResponse();
        await mockedMessageController.getCommentsByTicket(req, res);
        expect(res.json).toHaveBeenCalledWith(expected);
    });

    test('addMessageToTicket', async () => {
        const ticketId = 123;
        const message = 'hello';
        const sender = 'bob';
        const messageResult = await messageModelMock.createMessage(
            ticketId, sender, message,
        );
        await mockedMessageController.addMessageToTicket(
            ticketId,
            messageModelMock.MessageTypes.COMMENT,
            messageResult.objectId
        );

        const req = {params: {ticketId}};
        const res = mockResponse();
        const expected = {
            messages: [{
                ticketId,
                message,
                sender,
                createdAt: messageModelMock.sampleBeautifiedTimestamp,
                updatedAt: messageModelMock.sampleBeautifiedTimestamp,
            }],
        };
        await mockedMessageController.getCommentsByTicket(req, res);
        expect(res.json).toHaveBeenCalledWith(expected);
    });
});

describe('INCORRECT INPUT WITH NON-MOCKED MODEL', () => {
    test('get comments with missing params', async () => {
        const req = {params: {}};
        const res = mockResponse();
        await messageController.getCommentsByTicket(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });

    test('add comments with missing ticketId in params', async () => {
        const req = {
            params: {},
            body: {message: 'hello'},
            user: {username: 'bob'},
        };
        const res = mockResponse();
        await messageController.addCommentToTicket(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });

    test('add comments with missing message in body', async () => {
        const req = {
            params: {ticketId: 123},
            body: {},
            user: {username: 'bob'},
        };
        const res = mockResponse();
        await messageController.addCommentToTicket(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
