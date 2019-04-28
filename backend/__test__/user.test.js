const userModel = require('../__mocks__/user.model');
const {UserController} = require('../user/user.controller');
const userPreferenceModel = require('../__mocks__/user-preference.model');
const { mockRequest, mockResponse } = require('mock-req-res');

const userController = new UserController([userModel,userPreferenceModel]);

describe('LOGIN TESTS', () => {
    async function _mockRequest(username, password) {
        const options = mockRequest({
            body: {
                username,
                password},
        });
        return options;
    }
    test('normal test case', async() => {
        const req = _mockRequest('branson_admin', 'secure');
        userController.login(req, async() => {
            expect(res.user).toBeDefined();
        });
    });
    test('non existent account test case', async() => {
        const req = _mockRequest('branson_admin', 'wrongPassword');
        userController.login(req, async() => {
            expect().toThrow('Unauthorized');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('','');
        userController.login(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('LOGOUT TESTS', () => {
    async function _mockRequest(sessionToken){
        const options = mockRequest({
            user: {
                sessionToken
            }
        });
        return options;
    };
    test('normal test case', async() => {
        const req = _mockRequest('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
        userController.logout(req, async() => {
            expect(res).toBe('Logged out');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('');
        userController.logout(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe ('REGISTER TESTS', () => {
    async function _mockRequest(username, password, role, email){
        const options = mockRequest({
            body: {
                username, 
                password,
                role,
                email
            }
        });
        return options;
    };
    test('normal test case', async() => {
        const req = _mockRequest('branson1', 'wowsecure', 'user', 'branson1@hotmail.com');
        userController.register(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });
    test('error message if username is taken', async() => {
        const req = _mockRequest('existing','wowsecure', 'user', 'branson1@hotmail.com');
        userController.register(req, async() => {
            expect().toThrow('Username taken');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('','','','');
        userController.register(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe ('GET ADMINS AND USERS TESTS', () => {
    test ('normal get admins test case', async() => {
        const req = mockRequest();
        userController.getAdmins(req, async() => {
            expect(res[0].role).toBe('admin');
        });
    });
    test ('normal get users test case', async() => {
        const req = mockRequest();
        userController.getAllUsers(req, async() => {
            expect(res.length).toBeMoreThan(0);
        });
    });
});
