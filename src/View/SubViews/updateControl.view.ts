import $ from 'jquery';

import { ControlsEnum, ClassName } from '../../utils';

function updateControl(): void {
    const newSelector: string = this.selectorState.slice(1);
    const $thumbs = $(this.selectorState + ' ' + ClassName.THUMBS);

    this.opts.controlConfig.forEach((item: string) => {
        const element: JQuery = $(`#${ newSelector }__control-${ item }`);

        element.on('input', () => {
            switch (item) {
                case ControlsEnum.MIN:
                    this.setControl();
                    this.setBar();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.MAX:
                    this.setControl();
                    this.setBar();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.STEP:
                    this.setControl();
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.FROM:
                    this.setControl();
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.TO:
                    this.setControl();
                    this.setBar();
                    this.setTooltip();
                    break;
            }
        });
    });

    $thumbs.on('input', () => {
        this.setBar();
        // this.setControl();
    });

}

export default updateControl;