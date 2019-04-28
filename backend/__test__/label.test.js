const labelModel = require('../__mocks__/label.model');
const {LabelController} = require('../label/label.controller');
const { mockRequest, mockResponse } = require('mock-req-res');

const labelController = new LabelController(labelModel);

describe('CREATE LABEL TESTS', () => {
    //createLabel(labelType, name)
    async function _mockRequest(labelType, name, colour) {
        const options = mockRequest({
            params: {
                labelType},
            body: {
                name,
                colour},
        });
        return options;
    }
    test('normal (tag) test case', async() => {
        const req = _mockRequest('tag', 'bug report');
        labelController.createLabel(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });

    test('normal (status) test case', async() => {
        const req = _mockRequest('status', 'open', '#40E0D0');
        labelController.createLabel(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });
    test('normal (priority) test case', async() => {
        const req = _mockRequest('priority', 'urgent', '#40E0D0');
        labelController.createLabel(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });
    test('error message if invalid colour', async() => {
        const req = _mockRequest('status', 'bug report', 'colour');
        labelController.createLabel(req, async() => {
            expect().toThrow('Invalid colour');
        });
    });
    
    test('error message if missing fields', async() => {
        const req = _mockRequest('', '');
        labelController.createLabel(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('GET LABELS BY TYPE TESTS', () => {
    async function _mockRequest(labelType) {
        const options = mockRequest({
            params: {
                labelType},
        });
        return options;
    }
    test('normal (tag) test case', async() => {
        const req = _mockRequest('tag');
        labelController.getLabels(req, async() => {
            expect(res.length).toBeGreaterThan(0);
        });
    });
    test('normal (status) test case', async() => {
        const req = _mockRequest('status');
        labelController.getLabels(req, async() => {
            expect(res.length).toBeGreaterThan(0);
        });
    });
    test('normal (priority) test case', async() => {
        const req = _mockRequest('priority');
        labelController.getLabels(req, async() => {
            expect(res.length).toBeGreaterThan(0);
        });
    });
    test('error message if invalid labelType', async() => {
        const req = _mockRequest('wrongType');
        labelController.getLabels(req, async() => {
            expect().toThrow('Invalid labelType');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('');
        labelController.getLabels(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('GET LABEL BY NAME TESTS', () => {
    async function _mockRequest(labelType, labelName) {
        const options = mockRequest({
            params: {
                labelType,
                labelName},
        });
        return options;
    }
    test('normal test case', async() => {
        const req = _mockRequest('tag' ,'bug report');
        labelController.getLabel(req, async() => {
            expect(res.objectId).toBeDefined();
        });
    });
    test('error message if invalid labelType', async() => {
        const req = _mockRequest('wrongType', 'bug report');
        labelController.getLabel(req, async() => {
            expect().toThrow('Invalid labelType');
        });
    });
    test('non-existent labelType of requested name test case', async() => {
        const req = _mockRequest('tag', 'no name');
        labelController.getLabel(req, async() => {
            expect(res).toBeUndefined();
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('', '');
        labelController.getLabel(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('MODIFY LABEL TESTS', () => {
    async function _mockRequest(labelType, labelName) {
        const options = mockRequest({
            params: {
                labelType,
                labelName},
        });
        return options;
    }
    test('normal (tag) test case', async() => {
        const req = _mockRequest('tag' ,'S9Zo7fsQfI', 'new name');
        labelController.getLabel(req, async() => {
            expect(res.updatedAt).toBeDefined();
        });
    });
    test('error message if invalid labelType', async() => {
        const req = _mockRequest('status',  'S9Zo7fsQfI', 'new name');
        labelController.getLabel(req, async() => {
            expect().toThrow('Invalid labelType');
        });
    });
    test('non-existent label test case', async() => {
        const req = _mockRequest('tag', 'fakeId', 'new name');
        labelController.getLabel(req, async() => {
            expect().toThrow('Object not found');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('', '', '');
        labelController.getLabel(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});

describe('MODIFY LABEL WITH COLOUR TESTS', () => {
    async function _mockRequest(labelType, labelName, name, colour) {
        const options = mockRequest({
            params: {
                labelType,
                labelName},
            body: {
                name,
                colour},
        });
        return options;
    }
    test('normal (status) test case', async() => {
        const req = _mockRequest('status', 'S9Zo7fsQfI', 'new name', '#ED4337');
        labelController.modifyLabelc(req, async() => {
            expect(res.updatedAt).toBeDefined();
        });
    });
    test('normal (priority) test case', async() => {
        const req = _mockRequest('priority', 'S9Zo7fsQfI', 'new name', '#ED4337');
        labelController.modifyLabelc(req, async() => {
            expect(res.updatedAt).toBeDefined();
        });
    });
    test('error message if invalid labelType', async() => {
        const req = _mockRequest('tag', 'S9Zo7fsQfI', 'new name', '#ED4337');
        labelController.modifyLabelc(req, async() => {
            expect().toThrow('Invalid labelType');
        });
    });
    test('non-existent label test case', async() => {
        const req = _mockRequest('status', 'fakeId', 'new name', '#ED4337');
        labelController.modifyLabelc(req, async() => {
            expect().toThrow('Object not found');
        });
    });
    test('error message if invalid colour', async() => {
        const req = _mockRequest('status', 'S9Zo7fsQfI', 'new name', 'colour');
        labelController.modifyLabelc(req, async() => {
            expect().toThrow('Invalid colour');
        });
    });
    test('error message if missing fields', async() => {
        const req = _mockRequest('', '', '', '');
        labelController.modifyLabelc(req, async() => {
            expect().toThrow('Missing fields');
        });
    });
});