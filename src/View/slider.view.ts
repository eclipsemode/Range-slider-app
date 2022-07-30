import ChangeEvent = JQuery.ChangeEvent;
import $ from 'jquery';

import ModelOption from '../utils/ModelOption';
import {TogglesEnum, ControlsEnum} from '../utils/Config.enum';
import evaluateVar from '../utils/evaluateVar';

import ConfigPanel from '../components/configPanel/ConfigPanel';

import setSlider from './SubViews/setSlider.view';
import setRulers from './SubViews/setRulers.view';
import setRange from './SubViews/setRange.view';
import setBar from './SubViews/setBar.view';
import setTooltip from './SubViews/setTooltip.view';


class View {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;

    private readonly setSlider: CallableFunction;
    private readonly setRange: CallableFunction;
    private readonly setRulers: CallableFunction;
    private readonly setBar: CallableFunction;
    private readonly setTooltip: CallableFunction;

    private configPanel: ConfigPanel;


    constructor(private selector: string, private options: Partial<ModelOption>) {
        this.selectorState = selector;
        this.optionsState = options;
        this.configPanel = new ConfigPanel(
            this.selectorState,
            this.optionsState.controlConfig,
            this.optionsState.toggleConfig
        );

        this.setSlider = setSlider.bind(this);
        this.setRulers = setRulers.bind(this);
        this.setRange = setRange.bind(this);
        this.setBar = setBar.bind(this);
        this.setTooltip = setTooltip.bind(this);

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

    updateControl = ():void => {
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

    updateConfig = ():void => {
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