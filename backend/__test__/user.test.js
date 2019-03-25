const userController = require('../user/user.controller');
const userModel = require('../user/user.model');

test('login throws if missing fields', async () => {
    await expect(userModel.login()).rejects.toThrow('Missing fields');
});

test('logout throws if missing sessionToken', async () => {
    await expect(userModel.logout()).rejects.toThrow('Missing session token');
})

test('register throws if missing fields', async () => {
    await expect(userModel.register('username', 'password')).rejects.toThrow('Missing fields');
});
