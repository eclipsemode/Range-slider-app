import {findMinPercent, findMaxPercent} from '../../src/utils/findThumbPercent';

describe('Testing findMinPercent', () => {
    test('Should return 50% where min number is 0', () => {
        expect(findMinPercent(0, 50, 100)).toBe('50%');
    });

    test('Should return 50% where min number is less than 0', () => {
        expect(findMinPercent(-50, 0, 50)).toBe('50%');
    });

    test('Should return 50% where min number is more than 0', () => {
        expect(findMinPercent(50, 100, 150)).toBe('50%');
    });
});

describe('Testing findMaxPercent', () => {
    test('Should return 50% where min number is 0', () => {
        expect(findMaxPercent(0, 50, 100)).toBe('50%');
    });

    test('Should return 50% where min number is less than 0', () => {
        expect(findMaxPercent(-50, 0, 50)).toBe('50%');
    });

    test('Should return 50% where min number is more than 0', () => {
        expect(findMaxPercent(50, 100, 150)).toBe('50%');
    });
});