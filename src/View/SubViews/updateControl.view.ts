import $ from 'jquery';

import { ControlsEnum } from '../../utils';

function updateControl(): void {
    const newSelector: string = this.selectorState.slice(1);

    const handleControl = (item: string, e: JQuery.ChangeEvent): void => {
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
                this.opts.from = e.currentTarget.value;
                this.setBar();
                this.setTooltip();
                break;
            case ControlsEnum.TO:
                this.setBar();
                this.setTooltip();
                break;
        }
    };

    this.opts.controlConfig.forEach((item: string) => {
        const $element: JQuery = $(`#${ newSelector }__control-${ item }`);
        $element.off('input', (e: JQuery.ChangeEvent) => handleControl(item, e));
        $element.on('input', (e: JQuery.ChangeEvent) => handleControl(item, e));
    });
}

export default updateControl;