import { Progress } from '../../src/components';
import $ from 'jquery';

describe('Progress element', () => {
    const className = '.slider';
    const progress = new Progress(className);

    test('Should NOT be undefined', () => {
        expect(progress.getProgress).not.toBeUndefined();
    });

    test('Should be instance of jQuery', () => {
        expect(progress.getProgress()).toBeInstanceOf($);
    });
});