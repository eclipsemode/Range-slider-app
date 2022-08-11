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
    const $configMin = $('#slider__control-min');
    const $configMax = $('#slider__control-max');

    $configFrom.prop('step', this.optionsState.step);
    $configTo.prop('step', this.optionsState.step);
    $configMin.prop('step', this.optionsState.step);
    $configMax.prop('step', this.optionsState.step);


    const isCheckValues = (target?: string) => {
        const toMoreThanMax: boolean = +this.optionsState.to >
            (Math.floor(+this.optionsState.max / +this.optionsState.step) * +this.optionsState.step);
        const fromLessThanMin: boolean = +this.optionsState.from < +this.optionsState.min;
        const fromMoreThanMax: boolean = +this.optionsState.from > +this.optionsState.max;
        const toLessThanFrom: boolean =
            +this.optionsState.to - +this.optionsState.step
            < +this.optionsState.from + +this.optionsState.gap;

        if (target === ControlsEnum.TO) {
            toLessThanFrom ? this.optionsState.to = +this.optionsState.from + +this.optionsState.step : null;
        } else if (target === ControlsEnum.FROM) {
            toLessThanFrom ? this.optionsState.from = +this.optionsState.to - +this.optionsState.step : null;
        }

        toMoreThanMax ? this.optionsState.to =
            (Math.floor(+this.optionsState.max / +this.optionsState.step) * +this.optionsState.step) : null;
        fromLessThanMin ? this.optionsState.from = this.optionsState.min : null;
        fromMoreThanMax ? this.optionsState.from = this.optionsState.max : null;

    };

    this.optionsState.controlConfig.forEach((item: string) => {
        const element: JQuery = $(`#${newSelector}__control-${item}`);

        element.on('change', () => {
            const value: number = +element.val();
            switch (item) {
                case ControlsEnum.MIN:
                    if (value < +this.optionsState.max - +this.optionsState.gap) {
                        this.optionsState.min = value;
                    }
                    $thumbs.prop('min', this.optionsState.min);
                    this.setBar();
                    isCheckValues();
                    this.setConfig();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.MAX:
                    if (value >= +this.optionsState.min + +this.optionsState.gap) {
                        this.optionsState.max = value;
                    }
                    $thumbs.prop('max', this.optionsState.max);
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
                    $configMin.prop('step', this.optionsState.step);
                    $configMax.prop('step', this.optionsState.step);
                    $thumbs.prop('step', this.optionsState.step);
                    this.optionsState.from = $thumbMin.val();
                    this.optionsState.to = $thumbMax.val();
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.FROM:
                    this.optionsState.from = value;
                    isCheckValues(ControlsEnum.FROM);
                    $thumbMin.val(+this.optionsState.from);
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.TO:
                    this.optionsState.to = value;
                    isCheckValues(ControlsEnum.TO);
                    $thumbMax.val(+this.optionsState.to);
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    break;
            }
        });
    });

    $thumbMin.on('input', (e: ChangeEvent) => {
        if (e.currentTarget.value > +this.optionsState.to - +this.optionsState.step) {
            $thumbMin.val(+this.optionsState.to - +this.optionsState.step);
            this.optionsState.from = $thumbMin.val();
        } else {
            this.optionsState.from = e.currentTarget.value;
        }
        this.setConfig();
    });

    $thumbMax.on('input', (e: ChangeEvent) => {
        if (e.currentTarget.value < +this.optionsState.from + +this.optionsState.step) {
            $thumbMax.val(+this.optionsState.from + +this.optionsState.step);
            this.optionsState.to = $thumbMax.val();
        } else {
            this.optionsState.to = e.currentTarget.value;
        }
        this.setConfig();
    });
}

export default updateControl;