import $ from 'jquery';

import ConfigPanel from '../../components/configPanel/ConfigPanel';

import evaluateVar from '../../utils/evaluateVar';

function setConfig(): void {
    const configPanel: ConfigPanel = new ConfigPanel(
        this.selectorState,
        this.optionsState.controlConfig,
        this.optionsState.toggleConfig
    );
    const isConfigPanelTrue: boolean = this.optionsState.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);

    const configPanelElement: JQuery = $(`${this.selectorState} .js-slider-app__config`);

    if (isConfigPanelTrue) {
        const isGetConfigPanelIfMissing = () =>
            configPanelElement.length === 0
                ? configPanel.getConfig()
                : null;

        isGetConfigPanelIfMissing();
        const newSelector: string = this.selectorState.slice(1);
        const $controlTo = $(`#${newSelector}__control-to`);
        const isRangeTrue: boolean = this.optionsState.range;

        $(`#${newSelector}__toggle-tooltip`).prop('checked', this.optionsState.tooltip);

        !isRangeTrue
            ? $controlTo.prop('disabled', true)
            : $controlTo.prop('disabled', false);

        const isCheckThumbValues = () => {
            const toMoreThanMax: boolean = +this.optionsState.to > +this.optionsState.max;
            const fromLessThanMin: boolean = +this.optionsState.from < +this.optionsState.min;
            const fromMoreThanMax: boolean = +this.optionsState.from > +this.optionsState.max;

            toMoreThanMax ? this.optionsState.to = this.optionsState.max : null;
            fromLessThanMin ? this.optionsState.from = this.optionsState.min : null;
            fromMoreThanMax ? this.optionsState.from = this.optionsState.max : null;
        };

        isCheckThumbValues();

        this.optionsState.controlConfig.forEach((item: string) => {
            $(`#${newSelector}__control-${item}`)
                .val(evaluateVarBind(`this.optionsState.${item}`));
        });

        this.optionsState.toggleConfig.forEach((item: string) => {
            $(`#${newSelector}__toggle-${item}`)
                .attr('checked', evaluateVarBind(`this.optionsState.${item}`));
        });
    }
}

export default setConfig;