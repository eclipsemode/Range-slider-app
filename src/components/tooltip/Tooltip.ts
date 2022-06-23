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
        return $('<div>', {
            class: `slider-app__tooltip-container ${className}`
        }).prependTo(`${this.selector} .slider-app__tooltip-line`);
    }

    getTooltip(className: string, classNamePrepend: string, value: number) {
        return $('<div>', {
            class: `slider-app__tooltip-value ${className}`,
            text: value
        }).prependTo(`${this.selector} .${classNamePrepend}`);
    }

    getFirstTooltip() {
        this.getTooltipLine();
        this.getTooltipContainer('js-slider-app__tooltip-container-first');
        this.getTooltip('js-slider-app__tooltip-value-first',
            'js-slider-app__tooltip-container-first', this.value);
    }

    getSecondTooltip() {
        this.getTooltipContainer('js-slider-app__tooltip-container-second');
        this.getTooltip(
            'js-slider-app__tooltip-value-second',
            'js-slider-app__tooltip-container-second',
            this.valueSecond
        );
    }
}

export default Tooltip;