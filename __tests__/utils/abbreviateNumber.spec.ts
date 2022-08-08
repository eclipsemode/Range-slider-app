// import abbreviateNumber from '../../src/utils/abbreviateNumber';
// import {jest} from '@jest/globals';
//
// describe('Abbreviate number function', () => {
//     test('Should return value "20"', () => {
//         expect(+(abbreviateNumber(100, 0, 20))).toBeCloseTo(20);
//     });
//     test('Should return string', () => {
//         const mock = jest.fn<() => string>();
//
//         mock.mockReturnValue(abbreviateNumber(100, 0, 20));
//
//         expect(mock()).toBe('20');
//     });
//
//     test('Should return length', () => {
//         expect(abbreviateNumber(100, 0, 50)).toHaveLength(2);
//     });
//
//     test('Should', () => {
//         const value: number = 10000000000 * 50 / 100;
//
//         if (value > 10000000) {
//             expect(abbreviateNumber(10000000000, 0, 50)).toMatch('5e+9');
//         }
//     });
// });