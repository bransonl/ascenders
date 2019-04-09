const labelModel = require('../__mocks__/label.model');
// jest.mock('./ticket.model');
const {ModelError} = require('../error');

describe('CREATE LABEL TESTS', () => {
    //createLabel(labelType, name)
    test('normal (tag) test case', async() => {
        const response = await labelModel.createLabel('tag', 'bug report');
        expect(response.objectId).toBeDefined();
    });
    test('error message if invalid labelType', async() => {
        await expect(labelModel.createLabel('status', 'open'))
        .rejects.toThrow('Invalid labelType');
    });
    test('error message if missing fields', async() => {
        await expect(labelModel.createLabel())
        .rejects.toThrow('Missing fields');
    });
});

describe('CREATE LABEL(COLOUR) TESTS', () => {
    //createLabelc(labelType, name, colour)
    test('normal (status) test case', async() => {
        const response = await labelModel.createLabelc('status', 'open', '40E0D0');
        expect(response.objectId).toBeDefined();
    });
    test('normal (priority) test case', async() => {
        const response = await labelModel.createLabelc('priority', 'urgent', '40E0D0');
        expect(response.objectId).toBeDefined();
    });
    test('error message if invalid labelType', async() => {
        await expect(labelModel.createLabelc('tag', 'bug report', '40E0D0'))
        .rejects.toThrow('Invalid labelType');
    });
    test('error message if invalid colour', async() => {
        await expect(labelModel.createLabelc('status', 'bug report', 'color'))
        .rejects.toThrow('Invalid colour');
    });
    test('error message if missing fields', async() => {
        await expect(labelModel.createLabelc())
        .rejects.toThrow('Missing fields');
    });
});

describe('GET LABELS BY TYPE TESTS', () => {
    //getLabels(labelType)
    test('normal (tag) test case', async() => {
        const response = await labelModel.getLabels('tag');
        expect(response.length).toBeGreaterThan(0);
    });
    test('normal (status) test case', async() => {
        const response = await labelModel.getLabels('status');
        expect(response.length).toBeGreaterThan(0);
    });
    test('normal (priority) test case', async() => {
        const response = await labelModel.getLabels('priority');
        expect(response.length).toBeGreaterThan(0);
    });
    test('error message if invalid labelType', async() => {
        await expect(labelModel.getLabels('wrongType'))
        .rejects.toThrow('Invalid labelType');
    });
    test('error message if missing fields', async() => {
        await expect(labelModel.getLabels())
        .rejects.toThrow('Missing fields');
    });
});

describe('GET LABEL BY NAME TESTS', () => {
    //getLabel(labelType, name)
    test('normal test case', async() => {
        const response = await labelModel.getLabel('tag', 'bug report');
        expect(response.objectId).toBeDefined();
    });
    test('error message if invalid labelType', async() => {
        await expect(labelModel.getLabel('wrongType', 'bug report'))
        .rejects.toThrow('Invalid labelType');
    });
    test('non-existent labelType of name test case', async() => {
        const response = await labelModel.getLabel('tag', 'no name');
        expect(response).toBeUndefined();
    });
    test('error message if missing fields', async() => {
        await expect(labelModel.getLabel())
        .rejects.toThrow('Missing fields');
    });
});

describe('MODIFY LABEL TESTS', () => {
    //modifyLabel(labelType, labelId, name)
    test('normal (tag) test case', async() => {
        const response = await labelModel.modifyLabel('tag', 'S9Zo7fsQfI', 'new name');
        expect(response.updatedAt).toBeDefined();
    });
    test('error message if invalid labelType', async() => {
        await expect(labelModel.modifyLabel('status',  'S9Zo7fsQfI', 'new name'))
        .rejects.toThrow('Invalid labelType');
    });
    test('non-existent label test case', async() => {
        const response = await labelModel.modifyLabel('tag', 'fakeId', 'new name');
        expect(response).toEqual(new ModelError(101, 'Object not found'));
    });
    test('error message if missing fields', async() => {
        await expect(labelModel.modifyLabel())
        .rejects.toThrow('Missing fields');
    });
});

describe('MODIFY LABEL(COLOUR) TESTS', () => {
    //modifyLabelc(labelType, labelId, name, colour)
    test('normal (status) test case', async() => {
        const response = await labelModel.modifyLabelc('status', 'S9Zo7fsQfI', 'new name', 'ED4337');
        expect(response.updatedAt).toBeDefined();
    });
    test('normal (priority) test case', async() => {
        const response = await labelModel.modifyLabelc('priority', 'S9Zo7fsQfI', 'new name', 'ED4337');
        expect(response.updatedAt).toBeDefined();
    });
    test('error message if invalid labelType', async() => {
        await expect(labelModel.modifyLabelc('tag',  'S9Zo7fsQfI', 'new name', 'ED4337'))
        .rejects.toThrow('Invalid labelType');
    });
    test('non-existent label test case', async() => {
        const response = await labelModel.modifyLabelc('status', 'fakeId', 'new name', 'ED4337');
        expect(response).toEqual(new ModelError(101, 'Object not found'));
    });
    test('error message if invalid colour', async() => {
        await expect(labelModel.modifyLabelc('status', 'S9Zo7fsQfI', 'new name', 'color'))
        .rejects.toThrow('Invalid colour');
    });
    test('error message if missing fields', async() => {
        await expect(labelModel.modifyLabelc())
        .rejects.toThrow('Missing fields');
    });;
});
