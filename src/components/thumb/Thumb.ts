import $ from 'jquery';

class Thumb {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }
    
    getMinThumb(min: number, max: number, value: number, step: number): JQuery<HTMLElement> {
        return $('<input>', {
            class: 'slider-app__input js-slider-app__input slider-app__input-min js-slider-app__input-min',
            type: 'range',
            min: min,
            max: max,
            value: value,
            step: step
        }).appendTo(`${this.selector} .slider-app__bar-line`);
    }

    getMaxThumb(min: number, max: number, value: number, step: number): JQuery<HTMLElement> {
        return $('<input>', {
            class: 'slider-app__input js-slider-app__input slider-app__input-max js-slider-app__input-max',
            type: 'range',
            min: min,
            max: max,
            value: value,
            step: step
        }).appendTo(`${this.selector} .slider-app__bar-line`);
    }
    
}

export default Thumb;