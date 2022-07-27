import ModelOption from '../../src/utils/ModelOption';

describe('Testing ModelOption', () => {
    test('Should be Truthy', () => {
        const value: Partial<ModelOption> = {from: 100};
        expect(value).toBeTruthy();
    });
});