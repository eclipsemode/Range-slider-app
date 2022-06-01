import MinMaxValues from '../../src/components/minMaxValues/MinMaxValues';
import $ from 'jquery';

const className = '.slider';
const minMax = new MinMaxValues(className, 0, 1000);


describe('MinMax element', () => {

    test('Should NOT be undefined', () => {
        expect(minMax.getMinMaxValues).not.toBeUndefined();
    });

    test('Should be truthy', () => {
        expect(minMax.getMinMaxValues).toBeTruthy();
    });

    test('Should call a function', () => {
        const getMinMaxValues = MinMaxValues.prototype.getMinMaxValues = jest.fn();

        minMax.getMinMaxValues();

        expect(getMinMaxValues).toHaveBeenCalledTimes(1);
    });
});

describe('Min function', () => {
    test('Should be instance of jQuery', () => {
        expect(minMax.getMin()).toBeInstanceOf($);
    });
});

describe('Max function', () => {
    test('Should be instance of jQuery', () => {
        expect(minMax.getMax()).toBeInstanceOf($);
    });
});