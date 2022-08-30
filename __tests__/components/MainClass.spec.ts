import { MainClass } from '../../src/components';
import $ from 'jquery';

describe('Main class element', () => {
    const className = '.slider';
    const mainClass = new MainClass(className);

    test('Should NOT be undefined', () => {
        expect(mainClass.getMainClass()).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(mainClass.getMainClass()).toBeInstanceOf($);
    });
});