import $ from 'jquery';

import {ControlsEnum, ModelOption, ClassName} from '../../utils';

function updateControl(): void {
    const newSelector: string = this.selectorState.slice(1);
    const $thumbs = $(this.selectorState + ' ' + ClassName.THUMBS);
    const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
    const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);
    const $configFrom = $('#slider__control-from');
    const $configTo = $('#slider__control-to');
    const $configMin = $('#slider__control-min');
    const $configMax = $('#slider__control-max');
    const opts: ModelOption = this.getOpts();

    opts.from = +$thumbMin.val();
    opts.to = +$thumbMax.val();
    this.setBar();

    // const isCheckControlValues = (target?: string) => {
    //     const toMoreThanMax: boolean = +this.optionsState.to >
    //         (Math.floor(+this.optionsState.max / +this.optionsState.step) * +this.optionsState.step);
    //     const fromLessThanMin: boolean = +this.optionsState.from < +this.optionsState.min;
    //     const fromMoreThanMax: boolean = +this.optionsState.from > +this.optionsState.max;
    //     const toLessThanFrom: boolean =
    //         +this.optionsState.to - +this.optionsState.step
    //         < +this.optionsState.from + +this.optionsState.gap;
    //
    //     if (target === ControlsEnum.TO) {
    //         toLessThanFrom ? this.optionsState.to = +this.optionsState.from + +this.optionsState.step : null;
    //     } else if (target === ControlsEnum.FROM) {
    //         toLessThanFrom ? this.optionsState.from = +this.optionsState.to - +this.optionsState.step : null;
    //     }
    //
    //     toMoreThanMax ? this.optionsState.to =
    //         (Math.floor(+this.optionsState.max / +this.optionsState.step) * +this.optionsState.step) : null;
    //     fromLessThanMin ? this.optionsState.from = this.optionsState.min : null;
    //     fromMoreThanMax ? this.optionsState.from = this.optionsState.max : null;
    //
    // };

    this.optionsState.controlConfig.forEach((item: string) => {
        const element: JQuery = $(`#${ newSelector }__control-${ item }`);

        element.on('change', () => {
            const value: number = +element.val();
            switch (item) {
                case ControlsEnum.MIN:
                    // if (value < +this.optionsState.max - +this.optionsState.gap) {
                    //     this.optionsState.min = value;
                    // }
                    // $thumbs.prop('min', this.optionsState.min);
                    // isCheckControlValues();
                    // this.broadcast();
                    break;
                case ControlsEnum.MAX:
                    // if (value >= +this.optionsState.min + +this.optionsState.gap) {
                    //     this.optionsState.max = value;
                    // }
                    // $thumbs.prop('max', this.optionsState.max);
                    // isCheckControlValues();
                    // this.broadcast();
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
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.TO:
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    break;
            }
        });
    });

    $thumbs.on('input', () => {
        opts.from = +$thumbMin.val();
        opts.to = +$thumbMax.val();
        this.setConfig();
        this.setBar();
    });

}

export default updateControl;