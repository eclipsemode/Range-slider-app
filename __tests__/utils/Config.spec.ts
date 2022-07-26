import {TogglesEnum, ControlsEnum} from '../../src/utils/Config.enum';

describe('Config enum test', () => {
    test('Should no be undefined', () => {
        expect(TogglesEnum).not.toBeUndefined();
        expect(ControlsEnum).not.toBeUndefined();
    });
});