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

    getTooltipContainer(className: string) {
        return $('<span>', {
            class: `slider-app__tooltip-container ${className}`,
            text: 0
        }).prependTo(`${this.selector} .slider-app__tooltip-line`);
    }

    getFirstTooltip() {
        this.getTooltipLine();
        this.getTooltipContainer('js-slider-app__tooltip-container-first');
    }

    getSecondTooltip() {
        this.getTooltipContainer('js-slider-app__tooltip-container-second');
    }
}

export default Tooltip;