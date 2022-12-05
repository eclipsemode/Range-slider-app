import $ from 'jquery';

import {ClassName, evaluateVar} from '../../utils';

function setConfig() {
    const isConfigPanelTrue: boolean = this.optionsState.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);

    if (isConfigPanelTrue) {
        const newSelector: string = this.selectorState.slice(1);
        const isRangeTrue: boolean = this.opts.range;
        const $controlTo: JQuery = $(`.${ newSelector }__control-to`);
        const $toggleTooltip: JQuery = $(`.${ newSelector }__toggle-tooltip`);
        const $toggleRange: JQuery = $(`.${ newSelector }__toggle-range`);
        const $thumbMin: JQuery = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax: JQuery = $(this.selectorState + ' ' + ClassName.MAX);

        $toggleRange.one('change', (): void => {
            $thumbMin.val(this.opts.from);
            $thumbMax.val(this.opts.to);
        });

        $toggleTooltip.prop('checked', this.opts.tooltip);

        !isRangeTrue
            ? $controlTo.prop('disabled', true)
            : $controlTo.prop('disabled', false);

        this.opts.toggleConfig.forEach((item: string): void => {
            $(`${ this.selectorState }__toggle-${ item }`)
                .attr('checked', evaluateVarBind(`this.optionsState.${ item }`));
        });
    }
}

export default setConfig;