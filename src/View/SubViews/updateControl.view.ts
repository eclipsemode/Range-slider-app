import $ from 'jquery';

import {ControlsEnum, ModelOption, ClassName} from '../../utils';

function updateControl(): void {
    const newSelector: string = this.selectorState.slice(1);
    const $thumbs = $(this.selectorState + ' ' + ClassName.THUMBS);
    const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
    const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);
    const opts: ModelOption = this.getOpts();

    opts.from = +$thumbMin.val();
    opts.to = +$thumbMax.val();
    this.setBar();

    opts.controlConfig.forEach((item: string) => {
        const element: JQuery = $(`#${ newSelector }__control-${ item }`);

        element.on('input', () => {
            switch (item) {
                case ControlsEnum.MIN:
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.MAX:
                    this.setConfig();
                    this.setBar();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.STEP:
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
        this.setConfig();
        this.setBar();
    });

}

export default updateControl;