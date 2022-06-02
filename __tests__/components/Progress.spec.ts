import Progress from '../../src/components/progress/Progress';
import $ from 'jquery';

describe('Progress element', () => {
    const className = '.slider';
    const progress = new Progress(className);

    test('Should NOT be undefined', () => {
        expect(progress.getProgress()).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(progress.getProgress()).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(progress.getProgress().appendTo(className)).toBeTruthy();
    });
});