import $ from 'jquery';

class Tooltip {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    getTooltipLine() {
        return $('<div>', {
            class: 'slider-app__tooltip-line js-slider-app__tooltip-line'
        }).prependTo(`${this.selector} .slider-app__bar-line`);
    }

    getTooltip(className: string) {
        return $('<span>', {
            class: `slider-app__tooltip ${className}`,
            text: 0
        }).prependTo(`${this.selector} .slider-app__tooltip-line`);
    }

    getFirstTooltip() {
            this.getTooltipLine();
            this.getTooltip('js-slider-app__tooltip--first');
    }

    getSecondTooltip() {
        this.getTooltip('js-slider-app__tooltip--second');
    }
}

export default Tooltip;