import ModelOption from '../utils/ModelOption';
import {TogglesEnum, ControlsEnum} from '../utils/Config.enum';
import abbreviateNumber from '../utils/abbreviateNumber';
import {findMaxPercent, findMinPercent} from '../utils/findThumbPercent';
import evaluateVar from '../utils/evaluateVar';

import Rulers from '../components/rulers/Rulers';
import Thumb from '../components/thumb/Thumb';
import Progress from '../components/progress/Progress';
import Tooltip from '../components/tooltip/Tooltip';
import Bar from '../components/bar/Bar';
import MainClass from '../components/mainClass/MainClass';
import ConfigPanel from '../components/configPanel/ConfigPanel';

import ChangeEvent = JQuery.ChangeEvent;
import $ from 'jquery';

class View {
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
        this.tooltip = new Tooltip(this.selectorState);
        this.bar = new Bar(this.selectorState);
        this.configPanel = new ConfigPanel(
            this.selectorState,
            this.optionsState.controlConfig,
            this.optionsState.toggleConfig
        );
    }

    render(): void {
        this.setSlider();
        this.setRange();
        this.setBar();
        this.setRulers();
        this.setTooltip();
        this.setColor();
        this.setConfig();
        this.setVertical();

        this.updateConfig();
        this.updateControl();
    }

    updateControl = () => {
        const newSelector: string = this.selectorState.slice(1);
        const $thumbs = $(`${this.selectorState} .js-slider-app__input`);
        const $thumbMin = $(`${this.selectorState} .js-slider-app__input-min`);
        const $thumbMax = $(`${this.selectorState} .js-slider-app__input-max`);

        this.optionsState.controlConfig.forEach((item) => {
            const element: JQuery = $(`#${newSelector}__control-${item}`);

            element.on('change', () => {
                const value: number = +element.val();
                switch (item) {
                    case ControlsEnum.MIN:
                        this.optionsState.min = value;
                        $thumbs.prop('min', value);
                        this.setBar();
                        this.setTooltip();
                        break;
                    case ControlsEnum.MAX:
                        this.optionsState.max = value;
                        $thumbs.prop('max', value);
                        this.setBar();
                        this.setTooltip();
                        break;
                    case ControlsEnum.STEP:
                        this.optionsState.step = value;
                        $thumbs.prop('step', value);
                        this.setBar();
                        this.setTooltip();
                        break;
                    case ControlsEnum.FROM:
                        this.optionsState.from = value;
                        $thumbMin.val(value);
                        this.setBar();
                        this.setTooltip();
                        break;
                    case ControlsEnum.TO:
                        this.optionsState.to = value;
                        $thumbMax.val(value);
                        this.setBar();
                        this.setTooltip();
                        break;
                }
            });
        });

        $thumbMin.on('input', (e: ChangeEvent) => {
            this.optionsState.from = e.currentTarget.value;
            this.setConfig();
        });

        $thumbMax.on('input', (e: ChangeEvent) => {
            this.optionsState.to = e.currentTarget.value;
            this.setConfig();
        });
    };

    updateConfig = () => {
        const newSelector: string = this.selectorState.slice(1);

        this.optionsState.toggleConfig.forEach(item => {
            const element: JQuery = $(`#${newSelector}__toggle-${item}`);

            element.on('change', () => {
                const value: boolean = element.prop('checked');

                switch (item) {
                    case TogglesEnum.VERTICAL:
                        this.optionsState.vertical = value;
                        this.setVertical();
                        break;
                    case TogglesEnum.RULERS:
                        this.optionsState.rulers = value;
                        this.setRulers();
                        break;
                    case TogglesEnum.PROGRESS:
                        this.optionsState.progress = value;
                        this.setBar();
                        break;
                    case TogglesEnum.TOOLTIP:
                        this.optionsState.tooltip = value;
                        this.setTooltip();
                        break;
                    case TogglesEnum.RANGE:
                        this.optionsState.range = value;
                        this.setRange();
                        break;
                }
            });
        });
    };

    private setSlider = () => {
        this.mainClass.getMainClass();
        $(this.selectorState).addClass('root');
    };

    private setConfig = (): void => {
        const isConfigPanelTrue: boolean = this.optionsState.configPanel;
        const evaluateVarBind: CallableFunction = evaluateVar.bind(this);

        const configPanel: JQuery = $(`${this.selectorState} .js-slider-app__config`);

        if (isConfigPanelTrue) {
            const isGetConfigPanelIfMissing = () =>
                configPanel.length === 0
                    ? this.configPanel.getConfig()
                    : null;

            isGetConfigPanelIfMissing();
            const newSelector: string = this.selectorState.slice(1);
            const $controlTo = $(`#${newSelector}__control-to`);
            const isRangeTrue: boolean = this.optionsState.range;

            $(`#${newSelector}__toggle-tooltip`).prop('checked', this.optionsState.tooltip);

            !isRangeTrue
                ? $controlTo.prop('disabled', true)
                : $controlTo.prop('disabled', false);

            this.optionsState.controlConfig.forEach(item => {
                $(`#${newSelector}__control-${item}`)
                    .val(evaluateVarBind(`this.optionsState.${item}`));
            });

            this.optionsState.toggleConfig.forEach(item => {
                $(`#${newSelector}__toggle-${item}`)
                    .attr('checked', evaluateVarBind(`this.optionsState.${item}`));
            });
        }
    };

    private setRulers = () => {
        const $rulers = $(`${this.selectorState} .js-slider-app__rulers`);
        const isRulersTrue: boolean = this.optionsState.rulers;

        if (isRulersTrue) {

            const isGetRulersIfMissing = () => $rulers.length === 0 ? this.rulers.getRulers() : null;
            isGetRulersIfMissing();
            const isFindValueByPercent = (percent: number): number =>
                this.optionsState.min + ((this.optionsState.max - this.optionsState.min) * percent / 100);


            this.setColor();
            this.setVertical();

            const $values: JQuery = $(`${this.selectorState} .js-slider-app__rulers-values`);
            const $minThumb: JQuery = $(`${this.selectorState} .js-slider-app__input-min`);
            const $maxThumb: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);

            $values.children().each((index, element) => {
                const minVal: number = this.optionsState.min;
                const maxVal: number = this.optionsState.max;
                const isPercentTrue: boolean = this.optionsState.percent;

                switch (index) {
                    case 0:
                        isPercentTrue
                            ? element.innerText = '0%'
                            : element.innerText = abbreviateNumber(maxVal - minVal, minVal, 0);

                        element.addEventListener('click', () => {
                            $minThumb.val(this.optionsState.min);
                            this.optionsState.from = +$minThumb.val();
                            this.setBar();
                            this.setTooltip();
                            this.setConfig();
                        });
                        break;
                    case 1:
                        isPercentTrue
                            ? element.innerText = '20%'
                            : element.innerText = abbreviateNumber(maxVal - minVal, minVal, 20);

                        element.addEventListener('click', () => {
                            if (this.optionsState.range) {
                                const isMinLessMaxWithGap: boolean =
                                    +this.optionsState.to -  +abbreviateNumber(maxVal - minVal, minVal, 20) >
                                        +this.optionsState.gap;

                                isMinLessMaxWithGap
                                    ? $minThumb.val(isFindValueByPercent(20))
                                    : $minThumb.val(+this.optionsState.to - +this.optionsState.gap);
                            } else {
                                $minThumb.val(isFindValueByPercent(20));
                            }
                            this.optionsState.from = +$minThumb.val();
                            this.setBar();
                            this.setTooltip();
                            this.setConfig();
                        });
                        break;
                    case 2:
                        isPercentTrue
                            ? element.innerText = '40%'
                            : element.innerText = abbreviateNumber(maxVal - minVal, minVal, 40);

                        element.addEventListener('click', () => {
                            if (this.optionsState.range) {
                                const isMinLessMaxWithGap: boolean =
                                    +this.optionsState.to -  +abbreviateNumber(maxVal - minVal, minVal, 40) >
                                    +this.optionsState.gap;

                                isMinLessMaxWithGap
                                    ? $minThumb.val(isFindValueByPercent(40))
                                    : $minThumb.val(+this.optionsState.to - +this.optionsState.gap);
                            } else {
                                $minThumb.val(isFindValueByPercent(40));
                            }
                            this.optionsState.from = +$minThumb.val();
                            this.setBar();
                            this.setTooltip();
                            this.setConfig();
                        });
                        break;
                    case 3:
                        isPercentTrue
                            ? element.innerText = '60%'
                            : element.innerText = abbreviateNumber(maxVal - minVal, minVal, 60);

                        element.addEventListener('click', () => {
                            if (this.optionsState.range) {
                                const isMaxMoreThanMinWithGap: boolean =
                                    +abbreviateNumber(maxVal - minVal, minVal, 60) - +this.optionsState.from >
                                    +this.optionsState.gap;

                                isMaxMoreThanMinWithGap
                                    ? $maxThumb.val(isFindValueByPercent(60))
                                    : $maxThumb.val(+this.optionsState.from + +this.optionsState.gap);
                                this.optionsState.to = +$maxThumb.val();
                            } else {
                                $minThumb.val(isFindValueByPercent(60));
                                this.optionsState.from = +$minThumb.val();
                            }
                            this.setBar();
                            this.setTooltip();
                            this.setConfig();
                        });
                        break;
                    case 4:
                        isPercentTrue
                            ? element.innerText = '80%'
                            : element.innerText = abbreviateNumber(maxVal - minVal, minVal, 80);

                        element.addEventListener('click', () => {
                            if (this.optionsState.range) {
                                const isMaxMoreThanMinWithGap: boolean =
                                    +abbreviateNumber(maxVal - minVal, minVal, 80) - +this.optionsState.from >
                                    +this.optionsState.gap;

                                isMaxMoreThanMinWithGap
                                    ? $maxThumb.val(isFindValueByPercent(80))
                                    : $maxThumb.val(+this.optionsState.from + +this.optionsState.gap);
                                this.optionsState.to = +$maxThumb.val();
                            } else {
                                $minThumb.val(isFindValueByPercent(80));
                                this.optionsState.from = +$minThumb.val();
                            }
                            this.setBar();
                            this.setTooltip();
                            this.setConfig();
                        });
                        break;
                    case 5:
                        isPercentTrue
                            ? element.innerText = '100%'
                            : element.innerText = abbreviateNumber(maxVal - minVal, minVal,  100);

                        element.addEventListener('click', () => {
                            if (this.optionsState.range) {
                                $maxThumb.val(this.optionsState.max);
                                this.optionsState.to = +$maxThumb.val();
                            } else {
                                $minThumb.val(this.optionsState.max);
                                this.optionsState.from = +$minThumb.val();
                            }
                            this.setBar();
                            this.setTooltip();
                            this.setConfig();
                        });
                        break;
                }
            });
        } else {
            $rulers.remove();
            $(`${this.selectorState} .js-slider-app__rulers-values`).remove();
        }
    };

    private setRange = () => {
        const $inputMax: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);
        const $inputMin: JQuery = $(`${this.selectorState} .js-slider-app__input-min`);
        const $thumbsMain: JQuery = $(`${this.selectorState} .js-slider-app__bar-line`);

        const isRangeTrue: boolean = this.optionsState.range;
        if (isRangeTrue) {
            this.setBar();
            $inputMin.length === 0 ? this.thumb.getMinThumb() : null;
            $inputMax.length === 0 ? this.thumb.getMaxThumb() : null;
        } else {
            $thumbsMain.length !== 0 ? $thumbsMain.remove() : null;
            this.setBar();
            this.thumb.getMinThumb();
        }

        this.setBar();
        this.setRulers();
        this.setConfig();
        $(`${this.selectorState} .js-slider-app__input`).on('input', () => this.setBar());
        this.setTooltip();
        this.setVertical();
        this.updateControl();
    };

    private setBar(): void {
        const $bar: JQuery = $(`${this.selectorState} .js-slider-app__bar-line`);

        $bar.length === 0 ? this.bar.getBar() : null;

        const $range = $(`${this.selectorState} .js-slider-app__input`);
        const $minThumb = $(`${this.selectorState} .js-slider-app__input-min`);
        const minVal: number = this.optionsState.min;
        const isProgressTrue: boolean = this.optionsState.progress;
        const isRangeTrue: boolean = this.optionsState.range;
        const gap: number = this.optionsState.gap;
        const $maxThumb: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);

        if (isProgressTrue) {
            $(`${this.selectorState} .js-slider-app__progress`).length === 0
                ? this.progress.getProgress()
                : null;
        } else $(`${this.selectorState} .js-slider-app__progress`).remove();

        // noinspection JSJQueryEfficiency
        const $progress: JQuery = $(`${this.selectorState} .js-slider-app__progress`);

        if (isRangeTrue) {
            $progress.css({
                width: 'auto',
                height: 100 + '%',
                left: findMinPercent(minVal, Number($minThumb.val()), parseInt($minThumb.attr('max'))),
                right: findMaxPercent(minVal, Number($maxThumb.val()), parseInt($maxThumb.attr('max')))
            });

            $range.each(function (index, element) {
                $(element).on('input', (event) => {
                    const minThumbValue = Number($minThumb.val());
                    const maxThumbValue = Number($maxThumb.val());
                    const isValueLessGap: boolean = maxThumbValue - minThumbValue < gap;
                    const hasClassInputMin: boolean =
                        $(event.currentTarget).hasClass('js-slider-app__input-min');

                    if (isValueLessGap) {
                        hasClassInputMin
                            ? $(this).val(maxThumbValue - gap)
                            : $(this).val(minThumbValue + gap);
                    }

                    $progress.css({
                        width: 'auto',
                        left: findMinPercent(
                            minVal,
                            Number($minThumb.val()),
                            parseInt($minThumb.attr('max'))),
                        right: findMaxPercent(
                            minVal,
                            Number($maxThumb.val()),
                            parseInt($maxThumb.attr('max'))),
                    });
                });
            });
        } else {
            $progress.css({
                width: findMinPercent(minVal, Number($minThumb.val()), parseInt($minThumb.attr('max'))),
                height: 100 + '%'});
        }
    }

    setTooltip(): void {
        const isTooltipTrue: boolean = this.optionsState.tooltip;
        const isPercentTrue: boolean = this.optionsState.percent;
        const isRangeTrue: boolean = this.optionsState.range;

        const isGetTooltipIfMissing = (): void => {
            if (isTooltipTrue) {
                $(`${this.selectorState} .js-slider-app__tooltip--first`).length === 0
                    ? this.tooltip.getFirstTooltip()
                    : null;
                this.optionsState.range &&
                $(`${this.selectorState} .js-slider-app__tooltip--second`).length === 0
                    ? this.tooltip.getSecondTooltip()
                    : null;
            } else {
                $(`${this.selectorState} .js-slider-app__tooltip-line`).remove();
                return;
            }
        };
        isGetTooltipIfMissing();
        this.setVertical();

        const $tooltipMin: JQuery =
            $(`${this.selectorState} .js-slider-app__tooltip--first`);
        const $inputMin: JQuery = $(`${this.selectorState} .js-slider-app__input-min`);

        $tooltipMin.css({
            left: ((+this.optionsState.from - +this.optionsState.min)
                / (+this.optionsState.max - +this.optionsState.min)) * 100 + '%',
            bottom: '1.5rem'
        });

        $inputMin.on({
            input: () => {
                $tooltipMin.css('left',
                    ((+this.optionsState.from - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min)) * 100 + '%');
            }
        });

        if (!isPercentTrue) {
            $tooltipMin.text(this.optionsState.from);

            $inputMin.on('input', () => {
                $tooltipMin.text(this.optionsState.from);
            });
        } else {
            $tooltipMin.text(
                Math.trunc((+this.optionsState.from - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min) * 100) + '%');

            $inputMin.on('input', () =>
                $tooltipMin.text(
                    Math.trunc((+this.optionsState.from - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min) * 100) + '%'));
        }

        if (isRangeTrue) {
            const $tooltipMax: JQuery =
                $(`${this.selectorState} .js-slider-app__tooltip--second`);
            const $inputMax: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);

            $tooltipMax.css(
                'left',
                (((+this.optionsState.to - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min)) * 100) + '%');

            $inputMax.on({
                input: () => {
                    $tooltipMax.css('left',
                        (((+this.optionsState.to - +this.optionsState.min)
                            / (+this.optionsState.max - +this.optionsState.min)) * 100) + '%');
                }
            });

            if (!isPercentTrue) {
                $tooltipMax.text(this.optionsState.to);
                $inputMax.on('input', () => $tooltipMax.text(this.optionsState.to));
            } else {
                $tooltipMax.text(
                    Math.trunc((+this.optionsState.to - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min) * 100) + '%');

                $inputMax.on('input', () =>
                    $tooltipMax.text(
                        Math.trunc((+this.optionsState.to - +this.optionsState.min)
                            / (+this.optionsState.max - +this.optionsState.min) * 100) + '%'));
            }
        }
    }

    private setVertical(): void {

        if (this.optionsState.vertical) {

            $(`${this.selectorState}`).addClass('root--vertical');

            $(`${this.selectorState} .slider-app`)
                .addClass('slider-app--vertical');

            $(`${this.selectorState} .js-slider-app__bar-line`)
                .addClass('slider-app__bar-line--vertical');

            $(`${this.selectorState} .js-slider-app__rulers`)
                .addClass('slider-app__rulers--vertical');

            $(`${this.selectorState} .js-slider-app__rulers-values`)
                .addClass('slider-app__rulers-values--vertical');

        } else {

            $(`${this.selectorState}`).removeClass('root--vertical');

            $(`${this.selectorState} .slider-app`)
                .removeClass('slider-app--vertical');

            $(`${this.selectorState} .js-slider-app__bar-line`)
                .removeClass('slider-app__bar-line--vertical');

            $(`${this.selectorState} .js-slider-app__rulers`)
                .removeClass('slider-app__rulers--vertical');

            $(`${this.selectorState} .js-slider-app__rulers-values`)
                .removeClass('slider-app__rulers-values--vertical');

        }

        this.setColor();
        this.setBar();
    }

    private setColor(): void {
        const isColorAdded: string =
            this.optionsState.color.firstColor || this.optionsState.color.secondColor;
        const isTextColorAdded: string = this.optionsState.color.textColor;
        const isThumbColorAdded: string = this.optionsState.color.thumbColor;
        const $values: JQuery = $(`${this.selectorState} .js-slider-app__rulers-values`);

        if (isColorAdded) {
            const colorOne: string = this.optionsState.color.firstColor;
            const colorTwo: string = this.optionsState.color.secondColor;
            const $progress: JQuery = $(`${this.selectorState} .js-slider-app__progress`);

            $progress.css('background-image',
                `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`);
        }

        if (isTextColorAdded) {
            $values.css('color', this.optionsState.color.textColor);
            $(`${this.selectorState} .js-slider-app__config-text--inner`)
                .css('color', this.optionsState.color.textColor);

            $(`${this.selectorState} .js-slider-app__config-toggle-name`)
                .css('color', this.optionsState.color.textColor);

            // noinspection HtmlDeprecatedAttribute
            $(`<style type="text/css">${this.selectorState} .js-slider-app__config-toggle-btn::before
                {background-color: ${this.optionsState.color.textColor}}</style>`)
                .appendTo($('head'));
        }

        if (isThumbColorAdded) {
            // noinspection HtmlDeprecatedAttribute
            $(`<style type="text/css">${this.selectorState} .js-slider-app__input::-webkit-slider-thumb
                {background-color: ${this.optionsState.color.thumbColor}}</style>`)
                    .appendTo($('head'));
        }
    }
}

export default View;