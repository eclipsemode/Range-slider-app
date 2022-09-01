import $ from 'jquery';

import { ConfigPanel } from '../../components';

import { ClassName, evaluateVar, ModelOption } from '../../utils';
import ChangeEvent = JQuery.ChangeEvent;

function setConfig(): void {
    const configPanel: ConfigPanel = new ConfigPanel(
        this.selectorState,
        this.optionsState.controlConfig,
        this.optionsState.toggleConfig
    );
    const isConfigPanelTrue: boolean = this.optionsState.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);
    const configPanelElement: JQuery = $(this.selectorState + ' ' + ClassName.CONFIG);

    if (isConfigPanelTrue) {
        const isGetConfigPanelIfMissing = () =>
            configPanelElement.length === 0
                ? configPanel.getConfig()
                : null;

        isGetConfigPanelIfMissing();

        const newSelector: string = this.selectorState.slice(1);
        const isRangeTrue: boolean = this.optionsState.range;
        const opts: ModelOption = this.getOpts();
        const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

        const $controlTo = $(`#${ newSelector }__control-to`);
        const $controlFrom = $(`#${ newSelector }__control-from`);
        const $controlMin = $(`#${ newSelector }__control-min`);
        const $controlMax = $(`#${ newSelector }__control-max`);
        const $controlStep = $(`#${ newSelector }__control-step`);

        const $toggleTooltip = $(`#${ newSelector }__toggle-tooltip`);

        $thumbMin.on('input', () => {
            if (+$thumbMin.val() > +$thumbMax.val() - +opts.gap) {
                +$thumbMax.val() - +opts.step < +$thumbMax.val() - +opts.gap
                    ? $thumbMin.val(+$thumbMax.val() - +opts.step)
                    : $thumbMin.val(+$thumbMax.val() - +opts.gap);
            }
        });

        $controlFrom.on('input', (e: ChangeEvent) => {
            opts.from = e.currentTarget.value;
            $thumbMin.val(e.currentTarget.value);
            if (opts.from > +opts.to - +opts.gap) {
                if (+$thumbMax.val() - +opts.step < +$thumbMax.val() - +opts.gap) {
                    $thumbMin.val(+opts.to - +opts.step);
                    opts.from = +opts.to - +opts.step;
                } else {
                    $thumbMin.val(+opts.to - +opts.gap);
                    opts.from = +opts.to - +opts.gap;
                }
            }
        });

        $thumbMax.on('input', () => {
            if (+$thumbMin.val() > +$thumbMax.val() - +opts.gap) {
                +$thumbMin.val() + +opts.step > +$thumbMin.val() + +opts.gap
                    ? $thumbMax.val(+$thumbMin.val() + +opts.step)
                    : $thumbMax.val(+$thumbMin.val() + +opts.gap);
            }
        });

        $controlTo.on('input', (e: ChangeEvent) => {
            opts.to = e.currentTarget.value;
            $thumbMax.val(e.currentTarget.value);
            if (+opts.from > +opts.to - +opts.gap) {
                if (+$thumbMin.val() + +opts.step > +$thumbMin.val() + +opts.gap) {
                    $thumbMax.val(+opts.from + +opts.step);
                    opts.to = +opts.from + +opts.step;
                } else {
                    $thumbMax.val(+opts.from + +opts.gap);
                    opts.to = +opts.from + +opts.gap;
                }
            }
        });

        $controlFrom.prop('step', opts.step);
        $controlTo.prop('step', opts.step);
        $controlMin.prop('step', opts.step);
        $controlMax.prop('step', opts.step);

        $controlStep.prop('min', 0);
        $controlStep.prop('max', opts.max);

        $controlFrom.prop('min', opts.min);
        $controlFrom.prop('max', opts.max);
        $controlTo.prop('min', opts.min);
        $controlTo.prop('max', opts.max);


        $toggleTooltip.prop('checked', opts.tooltip);


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