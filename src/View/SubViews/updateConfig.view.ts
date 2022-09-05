import $ from 'jquery';
import { TogglesEnum } from '../../utils';

function updateConfig ():void {
    const newSelector: string = this.selectorState.slice(1);

    this.optionsState.toggleConfig.forEach((item: string): void => {
        const element: JQuery = $(`#${ newSelector }__toggle-${ item }`);

        element.on('change', (): void => {
            const value: boolean = element.prop('checked');

            switch (item) {
                case TogglesEnum.VERTICAL:
                    this.opts.vertical = value;
                    this.setBar();
                    this.setRulers();
                    this.setColor();
                    this.setControl();
                    this.setConfig();
                    this.setTooltip();
                    this.setVertical();
                    break;
                case TogglesEnum.RULERS:
                    this.opts.rulers = value;
                    this.setRulers();
                    this.setColor();
                    this.setVertical();
                    break;
                case TogglesEnum.PROGRESS:
                    this.opts.progress = value;
                    this.setBar();
                    break;
                case TogglesEnum.TOOLTIP:
                    this.opts.tooltip = value;
                    this.setTooltip();
                    this.setVertical();
                    break;
                case TogglesEnum.RANGE:
                    this.opts.range = value;
                    this.setBar();
                    this.setRange();
                    this.setRulers();
                    this.setColor();
                    this.setControl();
                    this.updateControl();
                    this.setConfig();
                    this.setTooltip();
                    this.setVertical();
                    break;
            }
        });
    });
}

export default updateConfig;