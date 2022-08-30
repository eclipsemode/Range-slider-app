import $ from 'jquery';

import { ConfigPanel } from '../../components';

import { evaluateVar } from '../../utils';

function setConfig(): void {
    const configPanel: ConfigPanel = new ConfigPanel(
        this.selectorState,
        this.optionsState.controlConfig,
        this.optionsState.toggleConfig
    );
    const isConfigPanelTrue: boolean = this.optionsState.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);

    const configPanelElement: JQuery = $(`${ this.selectorState } .js-slider-app__config`);

    if (isConfigPanelTrue) {
        const isGetConfigPanelIfMissing = () =>
            configPanelElement.length === 0
                ? configPanel.getConfig()
                : null;

        isGetConfigPanelIfMissing();
        const newSelector: string = this.selectorState.slice(1);
        const $controlTo = $(`#${ newSelector }__control-to`);
        const isRangeTrue: boolean = this.optionsState.range;

        $(`#${ newSelector }__toggle-tooltip`).prop('checked', this.optionsState.tooltip);

        !isRangeTrue
            ? $controlTo.prop('disabled', true)
            : $controlTo.prop('disabled', false);

        this.optionsState.controlConfig.forEach((item: string) => {
            $(`#${ newSelector }__control-${ item }`)
                .val(evaluateVarBind(`this.optionsState.${ item }`));
        });

        this.optionsState.toggleConfig.forEach((item: string) => {
            $(`#${ newSelector }__toggle-${ item }`)
                .attr('checked', evaluateVarBind(`this.optionsState.${ item }`));
        });
    }
}

export default setConfig;