import Thumb from '../../src/components/thumb/Thumb';
import $ from 'jquery';

const className = '.slider';
const min = 0;
const max = 1000;
const value = 500;
const valueSecond = 750;
const step = 10;

const thumb = new Thumb(className);

describe('Min Thumb', () => {

    test('Should NOT be undefined', () => {
        expect(thumb.getMinThumb(min, max, value, step)).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(thumb.getMinThumb(min, max, value, step)).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(thumb.getMinThumb(min, max, value, step).appendTo(className)).toBeTruthy();
    });

    test('Should be a correct value', () => {
        if (value === 500) {
            expect($('.slider-app__input-min').val('500')).toBeTruthy();
        }
    });

    test('Should be a correct min value', () => {
        if (min === 0) {
            expect($('.slider-app__input-min').attr('min', '0')).toBeTruthy();
        }
    });
});

describe('Max Thumb', () => {

    test('Should NOT be undefined', () => {
        expect(thumb.getMaxThumb(min, max, valueSecond, step)).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(thumb.getMaxThumb(min, max, valueSecond, step)).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(thumb.getMaxThumb(min, max, valueSecond, step).appendTo(className)).toBeTruthy();
    });

    test('Should be a correct valueSecond', () => {
        if (valueSecond === 750) {
            expect($('.slider-app__input-max').val('750')).toBeTruthy();
        }
    });

    test('Should be a correct max value', () => {
        if (max === 1000) {
            expect($('.slider-app__input-max').attr('max', '1000')).toBeTruthy();
        }
    });
});