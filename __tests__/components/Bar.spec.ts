import Bar from '../../src/components/bar/Bar';
import $ from 'jquery';

describe('Bar element', () => {
    const className = '.slider';
    const bar = new Bar(className);

    test('Should NOT be undefined', () => {
        expect(bar.getBar).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(bar.getBar()).toBeInstanceOf($);
    });

});