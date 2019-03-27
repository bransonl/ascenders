const messageModel = require('../message/message.model');

test('create message throws if missing fields', async () => {
    await expect(messageModel.createMessage(123)).rejects.toThrow('Missing fields');
});

test('create message throws if empty message', async () => {
    await expect(messageModel.createMessage('123', 'haha', '')).rejects.toThrow('Missing fields');
});

test('get messages throws if missing fields', async () => {
    await expect(messageModel.getMessageIdsByTicketAndType()).rejects.toThrow('Missing fields');
});

test('create ticket messages object throws if missing fields', async () => {
    await expect(messageModel.createTicketMessages(123)).rejects.toThrow('Missing fields');
});

test('add message to ticket messages throws if missing fields', async () => {
    await expect(messageModel.addToTicketMessageIds(123, '')).rejects.toThrow('Missing fields');
});