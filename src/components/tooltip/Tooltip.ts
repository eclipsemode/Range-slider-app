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
            class: 'slider-app__tooltip-line'
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
        this.getTooltipContainer('slider-app__tooltip-container-first');
        this.getTooltip('slider-app__tooltip-value-first', 'slider-app__tooltip-container-first', this.value);
    }

    getSecondTooltip() {
        this.getTooltipContainer('slider-app__tooltip-container-second');
        this.getTooltip(
            'slider-app__tooltip-value-second',
            'slider-app__tooltip-container-second',
            this.valueSecond
        );
    }
}

export default Tooltip;