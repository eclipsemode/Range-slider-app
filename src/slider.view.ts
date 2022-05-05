import {Controller} from "./slider.controller";
import {Model} from "./slider.model";
import {SliderRangeOptions} from "./slider";

class SliderRange {
    $el: JQuery<HTMLElement> = $(this.selector)
    constructor(private selector: string, private opts?: Partial<SliderRangeOptions>) {
        this.$el.append(Model.slider)
        Controller.getSlider()
    }

}

export {SliderRange}