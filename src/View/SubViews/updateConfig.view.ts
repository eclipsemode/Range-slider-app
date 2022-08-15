import $ from 'jquery';
import {TogglesEnum} from '../../utils/Config.enum';

function updateConfig ():void {
    const newSelector: string = this.selectorState.slice(1);

    this.optionsState.toggleConfig.forEach((item: string): void => {
        const element: JQuery = $(`#${newSelector}__toggle-${item}`);

        element.on('change', (): void => {
            const value: boolean = element.prop('checked');

            switch (item) {
                case TogglesEnum.VERTICAL:
                    this.optionsState.vertical = value;
                    this.broadcast();
                    break;
                case TogglesEnum.RULERS:
                    this.optionsState.rulers = value;
                    this.broadcast();
                    break;
                case TogglesEnum.PROGRESS:
                    this.optionsState.progress = value;
                    this.broadcast();
                    break;
                case TogglesEnum.TOOLTIP:
                    this.optionsState.tooltip = value;
                    this.broadcast();
                    break;
                case TogglesEnum.RANGE:
                    this.optionsState.range = value;
                    this.setRange();
                    this.updateControl();
                    this.broadcast();
                    break;
            }
        });
    });
}

export default updateConfig;