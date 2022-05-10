import {SliderRangeOptions} from './slider';
import Model from './slider.model';

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

    private static setHorizontal(value: boolean, selectorName: string) {
        if (value === false) {
            $(selectorName).css('transform', 'rotate(0deg)');

            $(selectorName + ' .slider-app__max-value').css('transform','rotate(360deg)');
            $(selectorName + ' .slider-app__max-value').css('justify-content','center');

            $(selectorName + ' .slider-app__min-value').css('transform','rotate(0deg)');
            $(selectorName + ' .slider-app__min-value').css('justify-content','center');

            $(selectorName + ' .slider-app__tooltip-value').css('transform','rotate(225deg)');

        }
        else if (value === true) {
            $(selectorName).css('transform', 'rotate(90deg)');
        }
        else {
            $(selectorName).css('transform', 'rotate(90deg)');
        }
    }

    private static getTooltip(selector: string, tooltipValue: boolean, percentValue: boolean) {

        if (tooltipValue === true) {
            const tooltipContainer: JQuery = $(selector + ' .slider-app__tooltip-container');
            const tooltipNum: JQuery = $(selector + ' .slider-app__tooltip-value');
            const inputElement: JQuery = $(selector + ' .slider-app__input');
            const maxValue: number = +$(selector + ' .slider-app__input').attr('max');
            const minValue: number = +$(selector + ' .slider-app__input').attr('min');
            const fontSize: number = tooltipNum.text().length - 2;

            tooltipContainer.css(
                'bottom',
                (((+inputElement.val() - minValue) / (maxValue - minValue)) * 100) + '%');
            tooltipContainer.css('opacity', 0);
            tooltipNum.css('font-size', 15 - fontSize + 'px');

            inputElement.on('input', () => {
                tooltipContainer.css(
                    'bottom',
                    (((+inputElement.val() - minValue) / (maxValue - minValue)) * 100) + '%');

                if (tooltipNum.text().length > 4) {
                    const fontSize: number = tooltipNum.text().length - 2;
                    tooltipNum.css('font-size', 15 - fontSize + 'px');
                } else {
                    tooltipNum.css('font-size', '15px');
                }
            });

            inputElement.on('mouseover', () => {
                    tooltipContainer.css('opacity', 1);
                });

            inputElement.on('mouseout', () => {
                    tooltipContainer.css('opacity', 0);
                });

        if (percentValue === false || !percentValue) {
            tooltipNum.text(parseInt(<string>inputElement.val()).toFixed());
            inputElement.on('input', () => {
                tooltipNum.text(parseInt(<string>inputElement.val()).toFixed());
            });
        }
        else if (percentValue === true) {
            tooltipNum.text(
                parseInt((((+inputElement.val() - minValue) / (maxValue - minValue)) * 100)
                    .toFixed()) + '%');
            inputElement.on('input', () => {
                tooltipNum.text(
                    parseInt((((+inputElement.val() - minValue) / (maxValue - minValue)) * 100)
                        .toFixed()) + '%');
            });
        }

        }
    }

    public static getSlider(selector: string, options: Partial<SliderRangeOptions>) {
        $(selector).append(Model.slider(options));
        this.setBar(selector);
        $(selector + ' .slider-app__input').on('input', () => {
            Controller.setBar(selector);
        });

        this.getTooltip(selector, options.tooltip, options.percent);
        this.setHorizontal(options.horizontal, selector);
    }
}

export default Controller;