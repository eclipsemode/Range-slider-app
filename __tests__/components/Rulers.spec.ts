import { Rulers } from '../../src/components';
import $ from 'jquery';

describe('Progress element', () => {
    const className = '.slider';
    const rulers = new Rulers(className);

    test('Should NOT be undefined', () => {
        expect(rulers.getRulers()).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(rulers.getRulers()).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(rulers.getRulers().appendTo(className)).toBeTruthy();
    });
});