import {Controller} from './slider.controller';
import {Model} from './slider.model';
import {SliderRangeOptions} from './slider';

class View {
    constructor(private selector: string, private options?: Partial<SliderRangeOptions>) {
        this.render();
    }
    render() {
        $(this.selector).append(Model.slider(this.options));
        Controller.getSlider(this.selector, this.options);
    }
}

export {View as default};