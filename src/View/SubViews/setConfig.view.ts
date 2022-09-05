import $ from 'jquery';

import { evaluateVar } from '../../utils';

function setConfig() {

    const isConfigPanelTrue: boolean = this.optionsState.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);

    if (isConfigPanelTrue) {
        const newSelector: string = this.selectorState.slice(1);
        const isRangeTrue: boolean = this.opts.range;
        const $controlTo = $(`#${ newSelector }__control-to`);
        const $toggleTooltip = $(`#${ newSelector }__toggle-tooltip`);

        $toggleTooltip.prop('checked', this.opts.tooltip);

        !isRangeTrue
            ? $controlTo.prop('disabled', true)
            : $controlTo.prop('disabled', false);

        this.opts.toggleConfig.forEach((item: string) => {
            $(`#${ newSelector }__toggle-${ item }`)
                .attr('checked', evaluateVarBind(`this.optionsState.${ item }`));
        });
    }
}

export default setConfig;