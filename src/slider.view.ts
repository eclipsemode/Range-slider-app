import {Controller} from "./slider.controller";
import {Model} from "./slider.model";
import {SliderRangeOptions} from "./slider";

class View {
    public static render() {
        Controller.getSlider();
    }
}

class SliderRange extends View {
    $el: JQuery<HTMLElement> = $(this.selector)
    constructor(private selector: string, private opts?: Partial<SliderRangeOptions>) {
        super();
        this.$el.append(Model.slider)
        SliderRange.render();
    }

}

export {SliderRange}