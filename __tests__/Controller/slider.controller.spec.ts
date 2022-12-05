import { Slider } from '../../src/Controller';
import $ from 'jquery';

describe('Testing Controller', () => {
    test('Should exists', () => {
        $('<div>', {
            class: 'test'
        }).appendTo('body');

        new Slider('.test');

        expect($('.test')).toHaveLength(1);
    });
});