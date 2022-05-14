import ModelOption from '../utils/ModelOption';

class View {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;

    constructor(private selector: string, private options: Partial<ModelOption>) {
        this.selectorState = selector;
        this.optionsState = options;
    }

    render() {
        this.setMain();
        this.setBar();
        $(`${this.selectorState} .slider-app__input`).on('input', () => this.setBar());
        this.setHorizontal();
        this.getTooltip();
        this.setColor();
        this.minMaxClick();
    }

    private setMain(): void {
        const app = $('<div>', {
            class: 'slider-app'
        });
        const rulers: JQuery = $('<span>', {class: 'slider-app__rulers'});
        const bar: JQuery = $('<span>', {class: 'slider-app__bar'});
        const input: JQuery = $('<input>', {
            class: 'slider-app__input',
            type: 'range',
            min: this.optionsState.min,
            max: this.optionsState.max,
            value: this.optionsState.value,
            step: this.optionsState.step
        });
        const minValue: JQuery = $('<div>', {
            class: 'slider-app__min-value',
            text: input.attr('min')
        });
        const maxValue: JQuery = $('<div>', {
            class: 'slider-app__max-value',
            text: input.attr('max')
        });
        const colorStart: JQuery = $('<span>', {class: 'slider-app__color-start'});
        const fill: JQuery = $('<span>', {class: 'slider-app__fill'});
        const stripe: JQuery = $('<span>', {class: 'slider-app__fill-stripe'});
        const tooltipContainer: JQuery = $('<div>', {class: 'slider-app__tooltip-container'});
        const tooltipValue: JQuery = $('<div>', {
            class: 'slider-app__tooltip-value',
            text: this.optionsState.value
        });

        tooltipContainer.append(tooltipValue);
        fill.append(stripe);
        bar.append(colorStart, fill, tooltipContainer);
        app.append(rulers, bar, minValue, input, maxValue);

        $(this.selectorState).append(app);
    }

    private setBar() {
        const $slider = $(`${this.selectorState} .slider-app__input`);
        const $fill = $(`${this.selectorState} .slider-app__bar .slider-app__fill`);

        const min: number = parseInt($slider.attr('min'));
        const max: number = parseInt($slider.attr('max'));
        const value: number = <number>$slider.val();
        const percent: number = ((value - min) / (max - min)) * 100;

        $fill.css('width', percent + '%');
    }

    private setHorizontal() {
        if (this.optionsState.horizontal === false) {
            const element: JQuery = $(this.selectorState);
            const maxElement: JQuery = $(`${this.selectorState} .slider-app__max-value`);
            const minElement: JQuery = $(`${this.selectorState} .slider-app__min-value`);
            const tooltipElement: JQuery = $(`${this.selectorState} .slider-app__tooltip-value`);

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

    private getTooltip() {
        const input: JQuery = $(`${this.selectorState} .slider-app__input`);
        const tooltipValue: JQuery = $(`${this.selectorState} .slider-app__tooltip-value`);

        if (this.optionsState.tooltip.display === true) {
            const tooltipNum: JQuery = tooltipValue;
            const tooltipContainer: JQuery = $(`${this.selectorState} .slider-app__tooltip-container`);
            const inputElement: JQuery = input;
            const maxValue: number = this.optionsState.max;
            const minValue: number = this.optionsState.min;
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

            if (this.optionsState.tooltip.percent === false || !this.optionsState.tooltip.percent) {
                tooltipNum.text(<string>inputElement.val());
                inputElement.on('input', () => {
                    tooltipNum.text(<string>inputElement.val());
                });
            }
            else if (this.optionsState.tooltip.percent === true) {
                tooltipNum.text(parseInt(String(
                    (+inputElement.val() - minValue) / (maxValue - minValue) * 100)) + '%');

                inputElement.on('input', () => {
                    tooltipNum.text(parseInt(String(
                        (+inputElement.val() - minValue) / (maxValue - minValue) * 100)) + '%');
                });
            }
        }
    }

    private setColor(): void {
        if (this.optionsState.color.firstColor || this.optionsState.color.secondColor) {
            const colorOne: string = this.optionsState.color.firstColor;
            const colorTwo: string = this.optionsState.color.secondColor;
            $(`${this.selectorState} .slider-app__fill-stripe`).css('background-image',
                `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`);
            $(`${this.selectorState} .slider-app__color-start`).css('background-color', colorOne);
        }

        if (this.optionsState.color.textColor) {
            $(`${this.selectorState} .slider-app__min-value, ${this.selectorState} .slider-app__max-value`)
                .css('color', this.optionsState.color.textColor);
        }

        if (this.optionsState.color.thumbColor) {
            // noinspection HtmlDeprecatedAttribute
            $(`<style type="text/css">${this.selectorState} .slider-app__input::-webkit-slider-thumb
                {background-color: ${this.optionsState.color.thumbColor}}</style>`)
                    .appendTo($('head'));
        }
    }

    private minMaxClick(): void {
        const input: JQuery = $(`${this.selectorState} .slider-app__input`);
        const minValue: JQuery = $(`${this.selectorState} .slider-app__min-value`);
        const maxValue: JQuery = $(`${this.selectorState} .slider-app__max-value`);

        minValue.on('click', () => {
            input.val(input.attr('min'));
            this.setBar();
            this.getTooltip();
        });

        maxValue.on('click', () => {
            input.val(input.attr('max'));
            this.setBar();
            this.getTooltip();
        });
    }
}

export default View;