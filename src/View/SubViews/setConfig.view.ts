import $ from 'jquery';

import {ClassName, evaluateVar} from '../../utils';

function setConfig() {

    const isConfigPanelTrue: boolean = this.optionsState.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);

    if (isConfigPanelTrue) {
        const newSelector: string = this.selectorState.slice(1);
        const isRangeTrue: boolean = this.opts.range;
        const $controlTo = $(`#${ newSelector }__control-to`);
        const $controlFrom = $(`#${ newSelector }__control-from`);
        const $controlMin = $(`#${ newSelector }__control-min`);
        const $controlMax = $(`#${ newSelector }__control-max`);
        const $toggleTooltip = $(`#${ newSelector }__toggle-tooltip`);
        const $toggleRange = $(`#${ newSelector }__toggle-range`);
        const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);


        $toggleRange.on('change', () => {
            $thumbMin.val(this.opts.from);
            $thumbMax.val(this.opts.to);
        });

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