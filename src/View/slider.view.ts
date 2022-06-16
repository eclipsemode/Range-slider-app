import ModelOption from '../utils/ModelOption';
import {TogglesEnum} from '../utils/Config.enum';
import abbreviateNumber from '../utils/abbreviateNumber';

import Rulers from '../components/rulers/Rulers';
import Thumb from '../components/thumb/Thumb';
import Progress from '../components/progress/Progress';
import Tooltip from '../components/tooltip/Tooltip';
import Bar from '../components/bar/Bar';
import MainClass from '../components/mainClass/MainClass';
import ConfigPanel from '../components/configPanel/ConfigPanel';
import Observer from '../Observer/Observer';

class View extends Observer {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;

    private rulers: Rulers;
    private thumb: Thumb;
    private progress: Progress;
    private tooltip: Tooltip;
    private bar: Bar;
    private mainClass: MainClass;
    private configPanel: ConfigPanel;


    constructor(private selector: string, private options: Partial<ModelOption>) {
        super();
        this.selectorState = selector;
        this.optionsState = options;
        this.mainClass = new MainClass(this.selectorState);
        this.rulers = new Rulers(this.selectorState);
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
        this.configPanel = new ConfigPanel(
            this.selectorState,
            this.optionsState.controlConfig,
            this.optionsState.toggleConfig
        );
    }

    render(): void {
        this.setRange();
        this.setBar();
        this.setRulers();
        this.setTooltip();
        this.setVertical();
        this.setColor();
        this.setConfig();

        this.updateToggleValues();


    }

    getSlider(): void {
        this.mainClass.getMainClass();
        this.optionsState.configPanel ? this.configPanel.getConfig() : null;
    }

    updateToggleValues = () => {
        const newSelector: string = this.selectorState.slice(1);

        const fn = (data: {key: string, value: boolean}) => {

            switch (data.key) {
                case TogglesEnum.VERTICAL:
                    this.optionsState.vertical = data.value;
                    this.updateVertical();
                    break;
                case TogglesEnum.RULERS:
                    this.optionsState.rulers = data.value;
                    this.setRulers();
                    break;
                case TogglesEnum.PROGRESS:
                    this.optionsState.progress = data.value;
                    this.setBar();
                    break;
                case TogglesEnum.TOOLTIP:
                    this.optionsState.tooltip = data.value;
                    this.setTooltip();
                    break;
                case TogglesEnum.RANGE:
                    this.optionsState.range = data.value;
                    this.setRange();
                    break;
            }
        };

        this.optionsState.toggleConfig.forEach(item => {
            $(`#${newSelector}__toggle-${item}`).on('change', () => {
                this.subscribe(fn);
                this.broadcast({
                    key: item,
                    value: $(`#${newSelector}__toggle-${item}`).prop('checked')
                });
                this.unsubscribe(fn);
            });
        });
    };

    private setConfig = (): void => {
        const newSelector: string = this.selectorState.slice(1);

        const selectorControlTo = $(`#${newSelector}__control-to`);

        $(`#${newSelector}__toggle-tooltip`).prop('checked', this.optionsState.tooltip);

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

    private updateVertical = () => {
        if (this.optionsState.vertical) {
            this.setVertical();
            this.setColor();
            this.setBar();
            this.setTooltip();
        } else {
            this.setVertical();
            this.setColor();
            this.setTooltip();
            this.setBar();
        }
    };

    private setRulers = () => {
        const $rulers = $(`${this.selectorState} .slider-app__rulers`);

        if (this.optionsState.rulers) {
            $rulers.length === 0 ? this.rulers.getRulers() : null;
            const $values: JQuery = $(`${this.selectorState} .slider-app__rulers-values`);
            const $minThumb: JQuery = $(`${this.selectorState} .slider-app__input-min`);
            const $maxThumb: JQuery = $(`${this.selectorState} .slider-app__input-max`);

            $values.css('color', this.optionsState.color.textColor);

            $values.children().css('font-size', $(this.selectorState).width() / 40 + 'px');

            $values.children().each((index, element) => {
                const max: number = this.optionsState.to;
                const gap: number = this.optionsState.gap;

                switch (index) {
                    case 0:
                        this.optionsState.percent
                            ? element.innerText = '0%'
                            : element.innerText = abbreviateNumber(max, 0);

                        element.addEventListener('click', () => {
                            $minThumb.val(this.optionsState.min);
                            this.setBar();
                            this.setTooltip();
                        });
                        break;
                    case 1:
                        this.optionsState.percent
                            ? element.innerText = '20%'
                            : element.innerText = abbreviateNumber(max, 20);

                        element.addEventListener('click', () => {
                            max * 20 / 100 < Number($maxThumb.val()) - gap
                                ? $minThumb.val(max * 20 / 100)
                                : $minThumb.val(Number($maxThumb.val()) - gap);
                            this.setBar();
                            this.setTooltip();
                        });
                        break;
                    case 2:
                        this.optionsState.percent
                            ? element.innerText = '40%'
                            : element.innerText = abbreviateNumber(max, 40);

                        element.addEventListener('click', () => {
                            max * 40 / 100 < Number($maxThumb.val()) - gap
                                ? $minThumb.val(max * 40 / 100)
                                : $minThumb.val(Number($maxThumb.val()) - gap);
                            this.setBar();
                            this.setTooltip();
                        });
                        break;
                    case 3:
                        this.optionsState.percent
                            ? element.innerText = '60%'
                            : element.innerText = abbreviateNumber(max, 60);

                        element.addEventListener('click', () => {
                            max * 60 / 100 > Number($minThumb.val()) + gap
                                ? $maxThumb.val(max * 60 / 100)
                                : $maxThumb.val(Number($minThumb.val()) + gap);
                            this.setBar();
                            this.setTooltip();
                        });
                        break;
                    case 4:
                        this.optionsState.percent
                            ? element.innerText = '80%'
                            : element.innerText = abbreviateNumber(max, 80);

                        element.addEventListener('click', () => {
                            max * 80 / 100 > Number($minThumb.val()) + gap
                                ? $maxThumb.val(max * 80 / 100)
                                : $maxThumb.val(Number($minThumb.val()) + gap);
                            this.setBar();
                            this.setTooltip();
                        });
                        break;
                    case 5:
                        this.optionsState.percent
                            ? element.innerText = '100%'
                            : element.innerText = abbreviateNumber(max, 100);

                        element.addEventListener('click', () => {
                            $maxThumb.val(this.optionsState.max);
                            this.setBar();
                            this.setTooltip();
                        });
                        break;
                }
            });
        } else {
            $rulers.remove();
            $(`${this.selectorState} .slider-app__rulers-values`).remove();
        }
    };

    private setRange = () => {
        const inputMax: JQuery = $(`${this.selectorState} .slider-app__input-max`);
        const inputMin: JQuery = $(`${this.selectorState} .slider-app__input-min`);
        const thumbsMain: JQuery = $(`${this.selectorState} .slider-app__bar-line`);

        if (this.optionsState.range) {
            this.setBar();
            // this.setProgress();
            inputMin.length === 0 ? this.thumb.getMinThumb() : null;
            inputMax.length === 0 ? this.thumb.getMaxThumb() : null;
        } else {
            thumbsMain.length !== 0 ? thumbsMain.remove() : null;
            this.setBar();
            // this.setProgress();
            this.thumb.getMinThumb();
        }

        this.setConfig();
        $(`${this.selectorState} .slider-app__input`).on('input', () => this.setBar());
        this.setTooltip();

    };

    private setBar(): void {
        const $bar: JQuery = $(`${this.selectorState} .slider-app__bar-line`);
        $bar.length === 0 ? this.bar.getBar() : null;
        const $range = $(`${this.selectorState} .slider-app__input`);
        const $minValue = $(`${this.selectorState} .slider-app__input-min`);

        if (this.optionsState.progress) {
            $(`${this.selectorState} .slider-app__progress`).length === 0
                ? this.progress.getProgress()
                : null;
        } else $(`${this.selectorState} .slider-app__progress`).remove();

        // noinspection JSJQueryEfficiency
        const $progress: JQuery = $(`${this.selectorState} .slider-app__progress`);

        if (!this.optionsState.range && this.optionsState.progress) {
            const value: number = <number>$minValue.val();
            const min: number = parseInt($minValue.attr('min'));
            const max: number = parseInt($minValue.attr('max'));
            const percent: number = ((value - min) / (max - min)) * 100;

            this.optionsState.vertical
                ? $progress.css({
                height: percent + '%',
                width: 100 + '%'})
                : $progress.css({
                width: percent + '%',
                height: 100 + '%'});

        } else if (this.optionsState.range && this.optionsState.progress) {
            const gap = this.optionsState.gap;
            const $maxValue = $(`${this.selectorState} .slider-app__input-max`);

            this.optionsState.vertical
                ? $progress.css({
                height: 'auto',
                bottom: (Number($minValue.val()) / Number($minValue.attr('max'))) * 100 + 1 + '%',
                top: 100 - (Number($maxValue.val()) / Number($maxValue.attr('max'))) * 100 + '%'})
                : $progress.css({
                width: 'auto',
                height: 100 + '%',
                left: (Number($minValue.val()) / Number($minValue.attr('max'))) * 100 + 1 + '%',
                right: 100 - (Number($maxValue.val()) / Number($maxValue.attr('max'))) * 100 + '%'});


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

    private setVertical(): void {
        // const $element: JQuery = $(this.selectorState);
        // const $maxElement: JQuery = $(`${this.selectorState} .slider-app__max-value`);
        // const $minElement: JQuery = $(`${this.selectorState} .slider-app__min-value`);
        // const $tooltipElement: JQuery = $(`${this.selectorState} .slider-app__tooltip-value`);

        if (this.optionsState.vertical) {

            $(`${this.selectorState} .slider-app`).addClass('slider-app--vertical');
            $(`${this.selectorState} .slider-app__input`)
                .addClass('slider-app__input--vertical')
                .css('width', $(`${this.selectorState}`).css('height'));

            $(`${this.selectorState} .slider-app__tooltip-line`)
                .addClass('slider-app__tooltip-line--vertical');

            $(`${this.selectorState} .slider-app__rulers`)
                .removeClass('slider-app__rulers')
                .addClass('slider-app__rulers--vertical');

            $(`${this.selectorState} .slider-app__bar-line`)
                .addClass('slider-app__bar-line--vertical');

            $(`${this.selectorState} .slider-app__progress`)
                .addClass('slider-app__progress--vertical');

            $(`${this.selectorState} .slider-app__tooltip-container`)
                .addClass('slider-app__tooltip-container--vertical');

            $(`${this.selectorState} .slider-app__tooltip-value`)
                .addClass('slider-app__tooltip-value--vertical');

            $(`${this.selectorState} .slider-app__min-value`)
                .addClass('slider-app__min-value--vertical');

            $(`${this.selectorState} .slider-app__max-value`)
                .addClass('slider-app__max-value--vertical');

        } else {
            $(`${this.selectorState} .slider-app`).removeClass('slider-app--vertical');

            $(`${this.selectorState} .slider-app__input`)
                .removeClass('slider-app__input--vertical')
                .css('width', parseInt($(`${this.selectorState}`).css('width')) + 10 + 'px');

            $(`${this.selectorState} .slider-app__tooltip-line`)
                .removeClass('slider-app__tooltip-line--vertical');

            $(`${this.selectorState} .slider-app__rulers--vertical`)
                .removeClass('slider-app__rulers--vertical')
                .addClass('slider-app__rulers');


            $(`${this.selectorState} .slider-app__bar-line`)
                .removeClass('slider-app__bar-line--vertical');

            $(`${this.selectorState} .slider-app__progress`)
                .removeClass('slider-app__progress--vertical');

            $(`${this.selectorState} .slider-app__tooltip-container`)
                .removeClass('slider-app__tooltip-container--vertical');

            $(`${this.selectorState} .slider-app__tooltip-value`)
                .removeClass('slider-app__tooltip-value--vertical');

            $(`${this.selectorState} .slider-app__min-value`)
                .removeClass('slider-app__min-value--vertical');

            $(`${this.selectorState} .slider-app__max-value`)
                .removeClass('slider-app__max-value--vertical');
        }
    }

    private setTooltip(): void {
        const tooltip: JQuery = $(`${this.selectorState} .slider-app__tooltip-line`);

        if (this.optionsState.tooltip) {
            tooltip.length === 0 ? this.tooltip.getFirstTooltip() : null;

            const maxValue: number = this.optionsState.max;
            const minValue: number = this.optionsState.min;
            const tooltipValueFirst: JQuery = $(`${this.selectorState} .slider-app__tooltip-value-first`);
            const tooltipContainerFirst: JQuery =
                $(`${this.selectorState} .slider-app__tooltip-container-first`);
            const inputMin: JQuery = $(`${this.selectorState} .slider-app__input-min`);
            const fontSizeFirst: number = tooltipValueFirst.text().length - 2;

            this.optionsState.vertical
                ? tooltipContainerFirst.css({
                    bottom: (( (+inputMin.val() - minValue) / (maxValue - minValue) ) * 100) + '%',
                    left: '0'
                })
                : tooltipContainerFirst.css({
                    left: (((+inputMin.val() - minValue) / (maxValue - minValue)) * 100) + '%',
                    bottom: '1.5rem'
                });

            tooltipValueFirst.css('font-size', 15 - fontSizeFirst + 'px');

            inputMin.on({
                input: () => {
                    this.optionsState.vertical
                        ? tooltipContainerFirst.css('bottom',
                            (((+inputMin.val() - minValue) / (maxValue - minValue)) * 100) + '%')
                        : tooltipContainerFirst.css('left',
                            (((+inputMin.val() - minValue) / (maxValue - minValue)) * 100) + '%');

                    if (tooltipValueFirst.text().length > 4) {
                        const fontSize: number = tooltipValueFirst.text().length - 2;
                        tooltipValueFirst.css('font-size', 15 - fontSize + 'px');
                    } else {
                        tooltipValueFirst.css('font-size', '15px');
                    }
                }
            });

            if (!this.optionsState.percent) {
                tooltipValueFirst.text(<string>inputMin.val());
                inputMin.on('input', () => tooltipValueFirst.text(<string>inputMin.val()));
            } else {
                tooltipValueFirst.text(parseInt(String(
                    (+inputMin.val() - minValue) / (maxValue - minValue) * 100)) + '%');

                inputMin.on('input', () =>
                    tooltipValueFirst.text(parseInt(String(
                        (+inputMin.val() - minValue) / (maxValue - minValue) * 100)) + '%'));
            }

            if (this.optionsState.range) {
                // noinspection JSJQueryEfficiency
                $(`${this.selectorState} .slider-app__tooltip-container-second`).length === 0
                    ? this.tooltip.getSecondTooltip()
                    : null;
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

                if (!this.optionsState.percent) {
                    tooltipValueSecond.text(<string>inputMax.val());
                    inputMax.on('input', () => tooltipValueSecond.text(<string>inputMax.val()));
                } else {
                    tooltipValueSecond.text(parseInt(String(
                        (+inputMax.val() - minValue) / (maxValue - minValue) * 100)) + '%');

                    inputMax.on('input', () =>
                        tooltipValueSecond.text(parseInt(String(
                            (+inputMax.val() - minValue) / (maxValue - minValue) * 100)) + '%'));
                }

            }

        } else tooltip.remove();

    }

    private setColor(): void {
        if (this.optionsState.color.firstColor || this.optionsState.color.secondColor) {
            const colorOne: string = this.optionsState.color.firstColor;
            const colorTwo: string = this.optionsState.color.secondColor;
            this.optionsState.vertical
                ? $(`${this.selectorState} .slider-app__progress`).css('background-image',
                `linear-gradient(to top, ${colorOne} 0%, ${colorTwo} 100%)`)
                : $(`${this.selectorState} .slider-app__progress`).css('background-image',
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
}

export default View;