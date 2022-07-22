import $ from 'jquery';

class Tooltip {
    private readonly selector: string;
    private readonly value: number;
    private readonly valueSecond: number;

    constructor(selector: string, value: number, valueSecond: number) {
        this.selector = selector;
        this.value = value;
        this.valueSecond = valueSecond;
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