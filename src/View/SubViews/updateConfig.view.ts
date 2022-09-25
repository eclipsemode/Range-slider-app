import $ from 'jquery';
import {ClassName, TogglesEnum} from '../../utils';

function updateConfig ():void {
    const newSelector: string = this.selectorState.slice(1);

    const handleConfig = (item: string, value: boolean): void => {
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
                this.setColor();
                break;
            case TogglesEnum.TOOLTIP:
                this.opts.tooltip = value;
                this.setTooltip();
                this.setVertical();
                break;
            case TogglesEnum.RANGE:
                this.opts.range = value;
                this.setRange();
                this.setBar();
                this.setControl();
                this.setConfig();
                this.setTooltip();
                this.setVertical();
                this.thumbsObserver();
                break;
        }
    };

    this.optionsState.toggleConfig.forEach((item: string): void => {
        const $element: JQuery = $(`#${ newSelector }__toggle-${ item }`);

        $element.off('change', () => {
            const value: boolean = $element.prop('checked');
            handleConfig(item, value);
        });
        $element.on('change', () => {
            const value: boolean = $element.prop('checked');
            handleConfig(item, value);
        });
    });
}

export default updateConfig;