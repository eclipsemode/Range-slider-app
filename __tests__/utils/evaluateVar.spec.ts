import EvaluateVar from '../../src/utils/evaluateVar';
import {jest} from '@jest/globals';

describe('EvaluateVar function', () => {
    test('Should not be undefined', () => {
        expect(EvaluateVar).not.toBeUndefined();
    });

    test('Should call a function', () => {
        const mock = jest.fn<() => string>();

        mock.mockReturnValue(EvaluateVar('("HELLO").toLowerCase()'));

        expect(mock()).toBe('hello');

    });
});