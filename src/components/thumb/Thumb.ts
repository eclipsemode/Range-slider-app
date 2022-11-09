import $ from 'jquery';

class Thumb {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    getMinThumb(min: number, max: number, value: number, step: number): JQuery {
        return $('<div>', {
            class: 'slider-app__thumb js-slider-app__thumb slider-app__thumb-min js-slider-app__thumb-min',
            type: 'range',
            min: min,
            max: max,
            value: value,
            step: step
        }).appendTo(`${ this.selector } .slider-app__line`);
    }

    getMaxThumb(min: number, max: number, value: number, step: number): JQuery {
        return $('<div>', {
            class: 'slider-app__thumb js-slider-app__thumb slider-app__thumb-max js-slider-app__thumb-max',
            type: 'range',
            min: min,
            max: max,
            value: value,
            step: step
        }).appendTo(`${ this.selector } .slider-app__line`);
    }

}

export default Thumb;