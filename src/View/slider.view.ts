import ModelOption from '../utils/ModelOption';

import Rulers from '../components/rulers/Rulers';
import MinMaxValues from '../components/minMaxValues/MinMaxValues';
import Thumb from '../components/thumb/Thumb';
import Progress from '../components/progress/Progress';
import Tooltip from '../components/tooltip/Tooltip';
import Bar from '../components/bar/Bar';
import MainClass from '../components/mainClass/MainClass';
import Config from '../components/config/Config';

class View {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;

    private rulers: Rulers;
    private minMaxValues: MinMaxValues;
    private thumb: Thumb;
    private progress: Progress;
    private tooltip: Tooltip;
    private bar: Bar;
    private mainClass: MainClass;
    private config: Config;


    constructor(private selector: string, private options: Partial<ModelOption>) {
        this.selectorState = selector;
        this.optionsState = options;
        this.mainClass = new MainClass(this.selectorState);
        this.rulers = new Rulers(this.selectorState);
        this.minMaxValues = new MinMaxValues(
            this.selectorState,
            this.optionsState.min,
            this.optionsState.max
        );
        this.thumb = new Thumb(
            this.selectorState,
            this.optionsState.min,
            this.optionsState.max,
            this.optionsState.from,
            this.optionsState.to,
            this.optionsState.step
        );
        this.progress = new Progress(this.selectorState);
        this.tooltip = new Tooltip(
            this.selectorState,
            this.optionsState.from,
            this.optionsState.to
        );
        this.bar = new Bar(this.selectorState);
        this.config = new Config(
            this.selectorState,
            this.optionsState.controlConfig,
            this.optionsState.toggleConfig
        );
    }

    render(): void {
        this.setProgress();
        $(`${this.selectorState} .slider-app__input`).on('input', () => this.setProgress());
        this.setTooltip();
        this.setHorizontal();
        this.setColor();
        this.setMinMax();
        this.setConfig();
    }

    getSlider(): void {
        this.mainClass.getMainClass();
        this.rulers.getRulers();
        this.minMaxValues.getMinMaxValues();
        this.bar.getBar();
        this.optionsState.progress ? this.progress.getProgress() : null;
        this.thumb.getMinThumb();
        this.optionsState.tooltip.display ? this.tooltip.getFirstTooltip() : null;
        if (this.optionsState.range) {
            this.thumb.getMaxThumb();
            this.tooltip.getSecondTooltip();
        }
        this.optionsState.config ? this.config.getConfig() : null;
    }

    private setConfig = (): void => {
        const newSelector: string = this.selectorState.slice(1);

        const selectorControlTo = $(`#${newSelector}__control-to`);
        !this.optionsState.range
            ? selectorControlTo.prop('disabled', true)
            : selectorControlTo.prop('disabled', false);

        this.optionsState.controlConfig.forEach(item => {
            $(`#${newSelector}__control-${item}`)
                .val(this.evaluateVar(`this.optionsState.${item}`));
        });

        this.optionsState.toggleConfig.forEach(item => {
            $(`#${newSelector}__toggle-${item}`)
                .attr('checked', this.evaluateVar(`this.optionsState.${item}`));
        });


    };

    evaluateVar = (item: string) => eval(item);

    private setProgress(): void {
        const $range = $(`${this.selectorState} .slider-app__input`);
        const $minValue = $(`${this.selectorState} .slider-app__input-min`);
        const $maxValue = $(`${this.selectorState} .slider-app__input-max`);
        const $progress = $(`${this.selectorState} .slider-app__progress`);
        const gap = this.optionsState.gap;
        const min: number = parseInt($minValue.attr('min'));
        const max: number = parseInt($minValue.attr('max'));
        const value: number = <number>$minValue.val();
        const percent: number = ((value - min) / (max - min)) * 100;

        if (!this.optionsState.range) {
            $progress.css('width', percent + '%');
        } else {
            $progress.css({
                width: 'auto',
                left: (Number($minValue.val()) / Number($minValue.attr('max'))) * 100 + 1 + '%',
                right: 100 - (Number($maxValue.val()) / Number($maxValue.attr('max'))) * 100 + '%',
            });

            $range.each(function () {
                $($maxValue).css('pointerEvents', 'none');
                $(this).on('input', () => {
                    const min = Number($minValue.val());
                    const max = Number($maxValue.val());
                    const minPercent: number = (min / Number($minValue.attr('max'))) * 100 + 1;
                    const maxPercent: number = 100 - (max / Number($maxValue.attr('max'))) * 100;

                    if (max - min < gap) {
                        $(this).hasClass('slider-app__input-min')
                            ? $(this).val(max - gap)
                            : $(this).val(min + gap);
                    }

                    $progress.css({
                        width: 'auto',
                        left: minPercent + '%',
                        right: maxPercent + '%'
                    });

                    minPercent > 45
                        ? $progress.css('transform', 'translateX(-15px)')
                        : $progress.css('transform', 'translateX(0px)');
                });
            });
        }
    }

    private setHorizontal(): void {
        if (this.optionsState.vertical) {
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

    private setTooltip(): void {
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
                mouseout: () => tooltipContainerFirst.css('opacity', 0),
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
            } else if (this.optionsState.tooltip.percent) {
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

    private setColor(): void {
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

    private setMinMax(): void {
        const inputMin: JQuery = $(`${this.selectorState} .slider-app__input-min`);
        const inputMax: JQuery = $(`${this.selectorState} .slider-app__input-max`);
        const minValue: JQuery = $(`${this.selectorState} .slider-app__min-value`);
        const maxValue: JQuery = $(`${this.selectorState} .slider-app__max-value`);

        minValue.on('click', () => {
            inputMin.val(inputMin.attr('min'));
            this.setProgress();
            this.setTooltip();
        });

        if (!this.optionsState.range) {
            maxValue.on('click', () => {
                inputMin.val(inputMin.attr('max'));
                this.setProgress();
                this.setTooltip();
            });
        } else {
            maxValue.on('click', () => {
                inputMax.val(inputMax.attr('max'));
                this.setProgress();
                this.setTooltip();
            });
        }
    }
}

export default View;