import $ from 'jquery';
import ChangeEvent = JQuery.ChangeEvent;

import {ControlsEnum} from '../../utils/Config.enum';

function updateControl ():void {
    const newSelector: string = this.selectorState.slice(1);
    const $thumbs = $(`${this.selectorState} .js-slider-app__input`);
    const $thumbMin = $(`${this.selectorState} .js-slider-app__input-min`);
    const $thumbMax = $(`${this.selectorState} .js-slider-app__input-max`);
    const $configFrom = $('#slider__control-from');
    const $configTo = $('#slider__control-to');

    $configFrom.prop('step', this.optionsState.step);
    $configTo.prop('step', this.optionsState.step);

    const isCheckValues = () => {
        const toMoreThanMax: boolean = +this.optionsState.to > +this.optionsState.max;
        const fromLessThanMin: boolean = +this.optionsState.from < +this.optionsState.min;
        const fromMoreThanMax: boolean = +this.optionsState.from > +this.optionsState.max;

        toMoreThanMax ? this.optionsState.to = this.optionsState.max : null;
        fromLessThanMin ? this.optionsState.from = this.optionsState.min : null;
        fromMoreThanMax ? this.optionsState.from = this.optionsState.max : null;
    };

    this.optionsState.controlConfig.forEach((item: string) => {
        const element: JQuery = $(`#${newSelector}__control-${item}`);

        element.on('change', () => {
            const value: number = +element.val();
            switch (item) {
                case ControlsEnum.MIN:
                    this.optionsState.min = value;
                    $thumbs.prop('min', value);
                    this.setBar();
                    isCheckValues();
                    this.setConfig();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.MAX:
                    this.optionsState.max = value;
                    $thumbs.prop('max', value);
                    this.setBar();
                    isCheckValues();
                    this.setConfig();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.STEP:
                    this.optionsState.step = value;
                    $configFrom.prop('step', this.optionsState.step);
                    $configTo.prop('step', this.optionsState.step);
                    $thumbs.prop('step', this.optionsState.step);
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.FROM:
                    this.optionsState.from = value;
                    $thumbMin.val(value);
                    isCheckValues();
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.TO:
                    this.optionsState.to = value;
                    $thumbMax.val(value);
                    isCheckValues();
                    this.setConfig();
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
}

export default updateControl;