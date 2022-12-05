import Model from '../../src/Model';
import { ModelOption } from '../../src/utils';

describe('Model test', () => {
    const opts: Partial<ModelOption> = {
        from: 0,
        to: 100
    };
    const newModel = new Model(opts);

    test('Should be defined', () => {
        expect(newModel).toBeInstanceOf(Model);
    });
});