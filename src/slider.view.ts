import {Controller} from './slider.controller';
import {SliderRangeOptions} from './slider';

class View {
    constructor(private selector: string, private options?: Partial<SliderRangeOptions>) {
        Controller.getSlider(selector, options);
    }
}

export {View as default};