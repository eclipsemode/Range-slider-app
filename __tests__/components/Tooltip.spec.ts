import Tooltip from '../../src/components/tooltip/Tooltip';
import $ from 'jquery';

const className = '.slider';
const value = 500;
const valueSecond = 750;
const tooltip = new Tooltip(className, value, valueSecond);

describe('Tooltip line', () => {

    test('Should NOT be undefined', () => {
        expect(tooltip.getTooltipLine()).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(tooltip.getTooltipLine()).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(tooltip.getTooltipLine().appendTo(className)).toBeTruthy();
    });
});

describe('Tooltip container', () => {

    test('Should NOT be undefined', () => {
        expect(tooltip.getTooltipContainer(className)).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(tooltip.getTooltipContainer(className)).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(tooltip.getTooltipContainer(className).appendTo(className)).toBeTruthy();
    });
});

describe('Tooltip element', () => {
    const classNamePrepend = 'classNamePrepend';

    test('Should NOT be undefined', () => {
        expect(tooltip.getTooltip(className, classNamePrepend, value)).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(tooltip.getTooltip(className, classNamePrepend, value)).toBeInstanceOf($);
    });

    test('Should append to main parent class', () => {
        expect(tooltip.getTooltip(className, classNamePrepend, value).appendTo(className)).toBeTruthy();
    });

    test('Should be equal to value', () => {
        expect(+($(`.slider-app__tooltip-value ${className}`).text())).toEqual(0);
    });
});

describe('First Tooltip', () => {

    test('Should NOT be undefined', () => {
        expect(tooltip.getFirstTooltip).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(tooltip.getFirstTooltip).toBeInstanceOf(Function);
    });

    test('Should call getFirstTooltip method', () => {
        const spy = jest.spyOn(tooltip, 'getFirstTooltip');

        tooltip.getFirstTooltip();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveLength(0);
    });
});

describe('Second Tooltip', () => {

    test('Should NOT be undefined', () => {
        expect(tooltip.getFirstTooltip).not.toBeUndefined();
    });

    test('Should be instance of Jquery', () => {
        expect(tooltip.getSecondTooltip).toBeInstanceOf(Function);
    });

    test('Should call getSecondTooltip method', () => {
        const spy = jest.spyOn(tooltip, 'getSecondTooltip');

        tooltip.getSecondTooltip();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveLength(0);
    });
});