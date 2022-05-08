import {SliderRangeOptions} from './slider';

class Controller {
    private static setBar(selector: string | void): void {
        const $slider = $(selector + ' .slider-app__input');
        const $fill = $(selector + ' .slider-app__bar .slider-app__fill');

        const min: number = parseInt($slider.attr('min'));
        const max: number = parseInt($slider.attr('max'));
        const value: number = <number>$slider.val();
        const percent: number = ((value - min) / (max - min)) * 100;

        $fill.css('height', percent + '%');
        this.setRGB(percent, selector);
    }

    private static setRGB(percent: number, selector: string | void): void {
        const rgb1: number[] = [255, 229, 59];
        const rgb2: number[] = [255, 37, 37];

        const R: number = this.calcPercent(rgb1[0], rgb2[0], percent);
        const G: number = this.calcPercent(rgb1[1], rgb2[1], percent);
        const B: number = this.calcPercent(rgb1[2], rgb2[2], percent);

        $(selector + ' .slider-app .slider-app__input::-webkit-slider-thumb').css(
            'background-color', 'rgba('+R+','+G+','+B+');');
    }

    private static calcPercent(s: number, e: number, p: number) {
        return (e - s) * (p / 100) + s;
    }

    public static getSlider(selector: string, options: Partial<SliderRangeOptions>) {
        this.setBar(selector);
        $(selector + ' .slider-app__input').on('input', () => {
            Controller.setBar(selector);
        });
        this.getTooltip(
            $(selector + ' .slider-app__tooltip'),
            $(selector + ' .slider-app__input'),
            options.tooltip,
            +$(selector + ' .slider-app__input').attr('max'),
            +$(selector + ' .slider-app__input').attr('min'),
            options.percent
        );

        this.setHorizontal(options.horizontal, $(selector));
    }

    public static setHorizontal(value: boolean, element: JQuery) {
        if (value === false) {
            element.css('transform', 'rotate(0deg)');
        }
        else if (value === true) {
            element.css('transform', 'rotate(90deg)');
        }
        else {
            element.css('transform', 'rotate(90deg)');
        }
    }

    public static getTooltip(
        tooltipValue: JQuery,
        inputValue: JQuery,
        tooltip: boolean,
        maxValue: number,
        minValue: number,
        percent: boolean
    ) {
        tooltipValue.css('bottom', (((+inputValue.val() - minValue) / (maxValue - minValue)) * 100) + '%');
        tooltipValue.css('opacity', 0);

        if (percent === false || !percent) {
            tooltipValue.text(parseInt(<string>inputValue.val()).toFixed());
            inputValue.on('input', () => {
                tooltipValue.text(parseInt(<string>inputValue.val()).toFixed());
            });
        }
        else if (percent === true) {
            tooltipValue.text(parseInt((((+inputValue.val() - minValue) / (maxValue - minValue)) * 100).toFixed()) + '%');
            inputValue.on('input', () => {
                tooltipValue.text(parseInt((((+inputValue.val() - minValue) / (maxValue - minValue)) * 100).toFixed()) + '%');
            });
        }

        if (tooltip === true) {

            inputValue.on('input', () => {
                tooltipValue.css('bottom', (((+inputValue.val() - minValue) / (maxValue - minValue)) * 100) + '%');
            });

            inputValue.on('mouseover', () => {
                tooltipValue.css('opacity', 1);
            });

            inputValue.on('mouseout', () => {
                tooltipValue.css('opacity', 0);
            });
        }
    }
}

export {Controller};