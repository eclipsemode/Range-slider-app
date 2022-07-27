import Controller from '../../src/Controller/slider.controller';
import $ from 'jquery';

describe('Testing Controller', () => {
    test('Should exists', () => {
        $('<div>', {
            class: 'test'
        }).appendTo('body');

        new Controller('.test');

        expect($('.test')).toHaveLength(1);
    });
});