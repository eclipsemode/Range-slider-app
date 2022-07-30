import ChangeEvent = JQuery.ChangeEvent;
import $ from 'jquery';

import ModelOption from '../utils/ModelOption';
import {TogglesEnum, ControlsEnum} from '../utils/Config.enum';

import setSlider from './SubViews/setSlider.view';
import setRulers from './SubViews/setRulers.view';
import setRange from './SubViews/setRange.view';
import setBar from './SubViews/setBar.view';
import setTooltip from './SubViews/setTooltip.view';
import setColor from './SubViews/setColor.view';
import setVertical from './SubViews/setVertical.view';
import setConfig from './SubViews/setConfig.view';


class View {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;
    private readonly setSlider: CallableFunction;
    private readonly setRange: CallableFunction;
    private readonly setRulers: CallableFunction;
    private readonly setBar: CallableFunction;
    private readonly setTooltip: CallableFunction;
    private readonly setColor: CallableFunction;
    private readonly setVertical: CallableFunction;
    private readonly setConfig: CallableFunction;

    constructor(private selector: string, private options: Partial<ModelOption>) {
        this.selectorState = selector;
        this.optionsState = options;
        this.setSlider = setSlider.bind(this);
        this.setRulers = setRulers.bind(this);
        this.setRange = setRange.bind(this);
        this.setBar = setBar.bind(this);
        this.setTooltip = setTooltip.bind(this);
        this.setColor = setColor.bind(this);
        this.setVertical = setVertical.bind(this);
        this.setConfig = setConfig.bind(this);
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

}

export default View;