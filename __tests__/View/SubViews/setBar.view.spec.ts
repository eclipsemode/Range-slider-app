import { Slider } from '../../../src/Controller/slider.controller';
import { setBar } from '../../../src/View/SubViews';

describe('setBar test', () => {
    const newSlider = new Slider('.test');
    const bindedBar = setBar.bind(newSlider);

    test('Should', () => {
        // expect(bindedBar()).toHaveLength(0);
    });
});