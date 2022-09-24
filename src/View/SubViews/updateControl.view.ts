import $ from 'jquery';

import { ControlsEnum } from '../../utils';

function updateControl(): void {
    const newSelector: string = this.selectorState.slice(1);

    this.opts.controlConfig.forEach((item: string) => {
        const element: JQuery = $(`#${ newSelector }__control-${ item }`);

        element.on('input', () => {
            switch (item) {
                case ControlsEnum.MIN:
                    this.setBar();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.MAX:
                    this.setBar();
                    this.setTooltip();
                    this.setRulers();
                    this.setColor();
                    break;
                case ControlsEnum.STEP:
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.FROM:
                    this.setBar();
                    this.setTooltip();
                    break;
                case ControlsEnum.TO:
                    this.setBar();
                    this.setTooltip();
                    break;
            }
        });
    });
}

export default updateControl;