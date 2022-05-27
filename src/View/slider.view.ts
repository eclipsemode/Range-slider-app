import ModelOption from '../utils/ModelOption';

class View {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;

    constructor(private selector: string, private options: Partial<ModelOption>) {
        this.selectorState = selector;
        this.optionsState = options;
    }

    render() {
        this.getRange();
        this.getBar();
        $(`${this.selectorState} .slider-app__input`).on('input', () => this.getBar());
        this.getTooltip();
        this.getHorizontal();
        this.getColor();
        this.getMinMax();
    }

    private getRange(): void {
        if (this.optionsState.range === false) {
            $(this.selectorState).append(`
            <div class="slider-app">
                <div class="slider-app__rulers"></div>
                <div class="slider-app__min-value">${this.optionsState.min}</div>
                <div class="slider-app__max-value">${this.optionsState.max}</div>
                <div class="slider-app__bar-line">
                    <div class="slider-app__tooltip-line">
                        <div class="slider-app__tooltip-container slider-app__tooltip-container-first">
                            <div class="slider-app__tooltip-value slider-app__tooltip-value-first">
                                ${this.optionsState.value}
                            </div>
                        </div>
                    </div>
                    <div class="slider-app__progress"></div>
                    <input type="range" class="slider-app__input slider-app__inp-min"
                        min=${this.optionsState.min} 
                        max=${this.optionsState.max}
                        value=${this.optionsState.value}
                        step=${this.optionsState.step}
                        >
                        </div>
                    </div>
            </div>
            `);
        } else {
            $(this.selectorState).append(`
            <div class="slider-app">
                <div class="slider-app__rulers"></div>
                <div class="slider-app__min-value">${this.optionsState.min}</div>
                <div class="slider-app__bar-line">
                    <div class="slider-app__tooltip-line">
                        <div class="slider-app__tooltip-container slider-app__tooltip-container-first">
                            <div class="slider-app__tooltip-value slider-app__tooltip-value-first">
                                ${this.optionsState.value}
                            </div>
                        </div>
                        <div class="slider-app__tooltip-container slider-app__tooltip-container-second">
                            <div class="slider-app__tooltip-value slider-app__tooltip-value-second">
                                ${this.optionsState.valueSecond}
                            </div>
                        </div>                        
                    </div>
                    <div class="slider-app__progress"></div>
                    <input type="range" class="slider-app__input slider-app__input-min"
                        min=${this.optionsState.min} 
                        max=${this.optionsState.max}
                        value=${this.optionsState.value}>
                    <input type="range" class="slider-app__input slider-app__input-max"
                        min=${this.optionsState.min} 
                        max=${this.optionsState.max}
                        value=${this.optionsState.valueSecond}>
                        </div>
                        </div>
                <div class="slider-app__max-value">${this.optionsState.max}</div>
            </div>
        `);
        }
    }

    private getBar() {
        if (this.optionsState.range === false) {
            const $slider = $(`${this.selectorState} .slider-app__input`);
            const $fill = $(`${this.selectorState} .slider-app__progress`);

            const min: number = parseInt($slider.attr('min'));
            const max: number = parseInt($slider.attr('max'));
            const value: number = <number>$slider.val();
            const percent: number = ((value - min) / (max - min)) * 100;

            $fill.css('width', percent + '%');

        } else {
            const range = $(`${this.selectorState} .slider-app__input`);
            const minValue = $(`${this.selectorState} .slider-app__input-min`);
            const maxValue = $(`${this.selectorState} .slider-app__input-max`);
            const progress = $(`${this.selectorState} .slider-app__progress`);
            const gap = this.optionsState.gap;

            progress.css({
                width: 'auto',
                left: (Number(minValue.val()) / Number(minValue.attr('max'))) * 100 + 1 + '%',
                right: 100 - (Number(maxValue.val()) / Number(maxValue.attr('max'))) * 100 + '%',
            });

            range.each(function () {
                $(this).css('pointerEvents', 'none');
                $(this).on('input', () => {
                    const min = Number(minValue.val());
                    const max = Number(maxValue.val());
                    const minPercent: number = (min / Number(minValue.attr('max'))) * 100 + 1;
                    const maxPercent: number = 100 - (max / Number(maxValue.attr('max'))) * 100;

                    if (max - min < gap) {
                        $(this).hasClass('slider-app__input-min')
                            ? $(this).val(max - gap)
                            : $(this).val(min + gap);
                    }

                    progress.css({
                        width: 'auto',
                        left: minPercent + '%',
                        right: maxPercent + '%'
                    });

                    minPercent > 45
                        ? progress.css('transform', 'translateX(-15px)')
                        : progress.css('transform', 'translateX(0px)');
                });
            });
        }
    }

    private getHorizontal() {
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
        if (this.optionsState.tooltip.display === true) {
            const maxValue: number = this.optionsState.max;
            const minValue: number = this.optionsState.min;

            const tooltipValueFirst: JQuery = $(`${this.selectorState} .slider-app__tooltip-value-first`);
            const tooltipContainerFirst: JQuery =
                $(`${this.selectorState} .slider-app__tooltip-container-first`);
            const inputMin: JQuery = $(`${this.selectorState} .slider-app__input-min`);
            const fontSizeFirst: number = tooltipValueFirst.text().length - 2;

            tooltipContainerFirst.css('left',
                (((+inputMin.val() - minValue) / (maxValue - minValue)) * 100) + '%');
            tooltipValueFirst.css('font-size', 15 - fontSizeFirst + 'px');

            inputMin.on({
                mouseover: () => tooltipContainerFirst.css('opacity', 1),
                mouseout: () => tooltipContainerFirst.css('opacity', 1),
                input: () => {
                    tooltipContainerFirst.css('left',
                        (((+inputMin.val() - minValue) / (maxValue - minValue)) * 100) + '%');

                    if (tooltipValueFirst.text().length > 4) {
                        const fontSize: number = tooltipValueFirst.text().length - 2;
                        tooltipValueFirst.css('font-size', 15 - fontSize + 'px');
                    } else {
                        tooltipValueFirst.css('font-size', '15px');
                    }
                }
            });

            if (this.optionsState.tooltip.percent === false || !this.optionsState.tooltip.percent) {
                tooltipValueFirst.text(<string>inputMin.val());
                inputMin.on('input', () => tooltipValueFirst.text(<string>inputMin.val()));
            } else if (this.optionsState.tooltip.percent === true) {
                tooltipValueFirst.text(parseInt(String(
                    (+inputMin.val() - minValue) / (maxValue - minValue) * 100)) + '%');

                inputMin.on('input', () =>
                    tooltipValueFirst.text(parseInt(String(
                        (+inputMin.val() - minValue) / (maxValue - minValue) * 100)) + '%'));
            }

            if (this.optionsState.range) {
                const tooltipValueSecond: JQuery =
                    $(`${this.selectorState} .slider-app__tooltip-value-second`);
                const tooltipContainerSecond: JQuery =
                    $(`${this.selectorState} .slider-app__tooltip-container-second`);
                const inputMax: JQuery = $(`${this.selectorState} .slider-app__input-max`);
                const fontSizeSecond: number = tooltipValueSecond.text().length - 2;

                tooltipContainerSecond.css(
                    'left',
                    (((+inputMax.val() - minValue) / (maxValue - minValue)) * 100) + '%');
                tooltipValueSecond.css('font-size', 15 - fontSizeSecond + 'px');

                inputMax.on({
                    mouseover: () => tooltipContainerSecond.css('opacity', 1),
                    mouseout: () => tooltipContainerSecond.css('opacity', 0),
                    input: () => {
                        tooltipContainerSecond.css('left',
                            (((+inputMax.val() - minValue) / (maxValue - minValue)) * 100) + '%');

                        if (tooltipValueSecond.text().length > 4) {
                            const fontSize: number = tooltipValueSecond.text().length - 2;
                            tooltipValueSecond.css('font-size', 15 - fontSize + 'px');
                        } else {
                            tooltipValueSecond.css('font-size', '15px');
                        }
                    }
                });

                if (this.optionsState.tooltip.percent === false || !this.optionsState.tooltip.percent) {
                    tooltipValueSecond.text(<string>inputMax.val());
                    inputMax.on('input', () => tooltipValueSecond.text(<string>inputMax.val()));
                } else if (this.optionsState.tooltip.percent === true) {
                    tooltipValueSecond.text(parseInt(String(
                        (+inputMax.val() - minValue) / (maxValue - minValue) * 100)) + '%');

                    inputMax.on('input', () =>
                        tooltipValueSecond.text(parseInt(String(
                            (+inputMax.val() - minValue) / (maxValue - minValue) * 100)) + '%'));
                }
            }
        }
    }

    private getColor(): void {
        if (this.optionsState.color.firstColor || this.optionsState.color.secondColor) {
            const colorOne: string = this.optionsState.color.firstColor;
            const colorTwo: string = this.optionsState.color.secondColor;
            $(`${this.selectorState} .slider-app__progress`).css('background-image',
                `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`);
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

    private getMinMax(): void {
        const input: JQuery = $(`${this.selectorState} .slider-app__input`);
        const minValue: JQuery = $(`${this.selectorState} .slider-app__min-value`);
        const maxValue: JQuery = $(`${this.selectorState} .slider-app__max-value`);

        minValue.on('click', () => {
            input.val(input.attr('min'));
            this.getBar();
        });

        maxValue.on('click', () => {
            input.val(input.attr('max'));
            this.getBar();
            this.getTooltip();
        });
    }
}

export default View;