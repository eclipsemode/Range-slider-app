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

        $fill.css('width', percent + '%');
    }

    private static setHorizontal(value: boolean, selectorName: string) {
        if (value === false) {
            const element: JQuery = $(selectorName);
            const maxElement: JQuery = $(selectorName + ' .slider-app__max-value');
            const minElement: JQuery = $(selectorName + ' .slider-app__min-value');
            const tooltipElement: JQuery = $(selectorName + ' .slider-app__tooltip-value');

            element.css('transform', 'rotate(270deg)');

            maxElement.css({
                transform: 'translateX(40px) rotate(90deg)',
                justifyContent: 'center'
            });

            minElement.css({
                transform: 'translateX(-30px) rotate(-90deg)',
                justifyContent: 'center'
            });

            tooltipElement.css('transform','rotate(225deg)');
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
                'left',
                (((+inputElement.val() - minValue) / (maxValue - minValue)) * 100) + '%');
            tooltipNum.css('font-size', 15 - fontSize + 'px');

            inputElement.on({
                mouseover: () => tooltipContainer.css('opacity', 1),
                mouseout: () => tooltipContainer.css('opacity', 0),
                input: () => {
                    tooltipContainer.css('left',
                        (((+inputElement.val() - minValue) / (maxValue - minValue)) * 100) + '%');
                    if (tooltipNum.text().length > 4) {
                        const fontSize: number = tooltipNum.text().length - 2;
                        tooltipNum.css('font-size', 15 - fontSize + 'px');
                    } else {
                        tooltipNum.css('font-size', '15px');
                    }
                }
            });

            if (percentValue === false || !percentValue) {
                tooltipNum.text(<string>inputElement.val());
                inputElement.on('input', () => {
                    tooltipNum.text(<string>inputElement.val());
                });
            }
            else if (percentValue === true) {
                tooltipNum.text(parseInt(String(
                    (+inputElement.val() - minValue) / (maxValue - minValue) * 100)) + '%');

                inputElement.on('input', () => {
                    tooltipNum.text(parseInt(String(
                        (+inputElement.val() - minValue) / (maxValue - minValue) * 100)) + '%');
                });
            }
        }
    }

    private static setColor(
        selector: string,
        color: {
            firstColor?: string;
            secondColor?: string;
            textColor?: string;
            thumbColor?: string },
    ): void {
        if (color.firstColor || color.secondColor) {
            const colorOne: string = color.firstColor ?? '#ffe53b';
            const colorTwo: string = color.secondColor ?? '#ff2525';
            $(`${selector} .slider-app__fill-stripe`).css('background-image',
                `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`);
            $(selector + ' .slider-app__color-start').css('background-color', colorOne);
        }

        if (color.textColor) {
            $(`${selector} .slider-app__min-value, ${selector} .slider-app__max-value`)
                .css('color', color.textColor);
        }

        if (color.thumbColor) {
            // noinspection HtmlDeprecatedAttribute
            $(`<style type="text/css">${selector} .slider-app__input::-webkit-slider-thumb
                {background-color: ${color.thumbColor}}</style>`).appendTo($('head'));
        }

    }

    private static minMaxClick(
        selector: string,
        tooltip: boolean,
        percent: boolean): void {
        const input: JQuery = $(`${selector} .slider-app__input`);
        const minValue: JQuery = $(`${selector} .slider-app__min-value`);
        const maxValue: JQuery = $(`${selector} .slider-app__max-value`);

        minValue.on('click', () => {
            input.val(input.attr('min'));
            this.setBar(selector);
            this.getTooltip(selector, tooltip, percent);
        });

        maxValue.on('click', () => {
            input.val(input.attr('max'));
            this.setBar(selector);
            this.getTooltip(selector, tooltip, percent);
        });
    }

    public static getSlider(selector: string, options: Partial<SliderRangeOptions>) {
        $(selector).append(Model.slider(options));
        this.setBar(selector);
        $(selector + ' .slider-app__input').on('input', () => {
            this.setBar(selector);
        });
        this.getTooltip(selector, options.tooltip, options.percent);
        this.setHorizontal(options.horizontal, selector);
        if (options.color) {this.setColor(selector, options.color);}
        this.minMaxClick(selector, options.tooltip, options.percent);
    }
}

export default Controller;