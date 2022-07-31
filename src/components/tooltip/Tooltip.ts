import $ from 'jquery';

class Tooltip {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    getTooltipLine(): JQuery<HTMLElement> {
        return $('<div>', {
            class: 'slider-app__tooltip-line js-slider-app__tooltip-line'
        }).appendTo(`${this.selector} .slider-app`);
    }

    getTooltip(className: string): JQuery<HTMLElement> {
        return $('<span>', {
            class: `slider-app__tooltip ${className}`,
            text: 0
        }).prependTo(`${this.selector} .slider-app__tooltip-line`);
    }

    getFirstTooltip(): void {
            this.getTooltip('js-slider-app__tooltip--first');
    }

    getSecondTooltip(): void {
        this.getTooltip('js-slider-app__tooltip--second');
    }
}

export default Tooltip;