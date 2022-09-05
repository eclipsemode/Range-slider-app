import $ from 'jquery';

import { ConfigPanel } from '../../components';

import { ClassName, evaluateVar } from '../../utils';
import ChangeEvent = JQuery.ChangeEvent;

function setControl(): void {
    const configPanel: ConfigPanel = new ConfigPanel(
        this.selectorState,
        this.opts.controlConfig,
        this.opts.toggleConfig
    );
    const isConfigPanelTrue: boolean = this.opts.configPanel;
    const evaluateVarBind: CallableFunction = evaluateVar.bind(this);
    const configPanelElement: JQuery = $(this.selectorState + ' ' + ClassName.CONFIG);

    if (isConfigPanelTrue) {
        const isGetConfigPanelIfMissing = () =>
            configPanelElement.length === 0
                ? configPanel.getConfig()
                : null;

        isGetConfigPanelIfMissing();

        const newSelector: string = this.selectorState.slice(1);
        const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);
        const $thumbs = $(this.selectorState + ' ' + ClassName.THUMBS);

        const $controlTo = $(`#${ newSelector }__control-to`);
        const $controlFrom = $(`#${ newSelector }__control-from`);
        const $controlMin = $(`#${ newSelector }__control-min`);
        const $controlMax = $(`#${ newSelector }__control-max`);
        const $controlStep = $(`#${ newSelector }__control-step`);

        $thumbMin.on('input', () => {
            if (+$thumbMin.val() > +$thumbMax.val() - +this.opts.gap && this.opts.range) {
                +$thumbMax.val() - +this.opts.step < +$thumbMax.val() - +this.opts.gap
                    ? $thumbMin.val(+$thumbMax.val() - +this.opts.step)
                    : $thumbMin.val(+$thumbMax.val() - +this.opts.gap);
            }
            this.opts.from = +$thumbMin.val();
        });

        $controlFrom.on('input', (e: ChangeEvent) => {
            this.opts.from = e.currentTarget.value;
            $thumbMin.val(e.currentTarget.value);
            if (this.opts.from > +this.opts.to - +this.opts.gap) {
                if (+$thumbMax.val() - +this.opts.step < +$thumbMax.val() - +this.opts.gap) {
                    $thumbMin.val(+this.opts.to - +this.opts.step);
                    this.opts.from = +this.opts.to - +this.opts.step;
                } else {
                    $thumbMin.val(+this.opts.to - +this.opts.gap);
                    this.opts.from = +this.opts.to - +this.opts.gap;
                }
            }
        });

        $thumbMax.on('input', () => {
            if (+$thumbMin.val() > +$thumbMax.val() - +this.opts.gap) {
                +$thumbMin.val() + +this.opts.step > +$thumbMin.val() + +this.opts.gap
                    ? $thumbMax.val(+$thumbMin.val() + +this.opts.step)
                    : $thumbMax.val(+$thumbMin.val() + +this.opts.gap);
            }
            this.opts.to = +$thumbMax.val();
        });

        $controlTo.on('input', (e: ChangeEvent) => {
            this.opts.to = e.currentTarget.value;
            $thumbMax.val(e.currentTarget.value);
            if (+this.opts.from > +this.opts.to - +this.opts.gap) {
                if (+$thumbMin.val() + +this.opts.step > +$thumbMin.val() + +this.opts.gap) {
                    $thumbMax.val(+this.opts.from + +this.opts.step);
                    this.opts.to = +this.opts.from + +this.opts.step;
                } else {
                    $thumbMax.val(+this.opts.from + +this.opts.gap);
                    this.opts.to = +this.opts.from + +this.opts.gap;
                }
            }
        });

        const isCheckControlValues = () => {
            const toMoreThanMax: boolean = +this.opts.to >
                (Math.floor(+this.opts.max / +this.opts.step) * +this.opts.step);
            const fromLessThanMin: boolean = +this.opts.from < +this.opts.min;
            const fromMoreThanMax: boolean = +this.opts.from > +this.opts.max;

            toMoreThanMax ? this.opts.to =
                (Math.floor(+this.opts.max / +this.opts.step) * +this.opts.step) : null;
            fromLessThanMin ? this.opts.from = this.opts.min : null;
            fromMoreThanMax ? this.opts.from = this.opts.max : null;
        };

        $controlMin.on('input', (e: ChangeEvent) => {
            if (+e.currentTarget.value < +this.opts.max - +this.opts.gap) {
                this.opts.min = +e.currentTarget.value;
            }
            $controlFrom.prop('min', this.opts.min);
            $controlTo.prop('min', this.opts.min);
            $thumbs.prop('min', this.opts.min);

            isCheckControlValues();
        });

        $controlMax.on('input', (e: ChangeEvent) => {
            if (+e.currentTarget.value >= +this.opts.min + +this.opts.gap) {
                this.opts.max = +e.currentTarget.value;
            }

            $controlFrom.prop('max', this.opts.max);
            $controlTo.prop('max', this.opts.max);
            $thumbs.prop('max', this.opts.max);

            isCheckControlValues();
        });

        $controlStep.on('input', (e: ChangeEvent) => {
            this.opts.step = +e.currentTarget.value;
            $controlFrom.prop('step', this.opts.step);
            $controlTo.prop('step', this.opts.step);
            $controlMin.prop('step', this.opts.step);
            $controlMax.prop('step', this.opts.step);
            $thumbs.prop('step', this.opts.step);
            this.opts.from = +$thumbMin.val();
            this.opts.range ? this.opts.to = +$thumbMax.val() : null;
        });

        $controlFrom.prop('step', this.opts.step);
        $controlTo.prop('step', this.opts.step);
        $controlMin.prop('step', this.opts.step);
        $controlMax.prop('step', this.opts.step);

        $controlStep.prop('min', 0);
        $controlStep.prop('max', this.opts.max);

        $controlFrom.prop('min', this.opts.min);
        $controlFrom.prop('max', this.opts.max);
        $controlTo.prop('min', this.opts.min);
        $controlTo.prop('max', this.opts.max);

        this.opts.controlConfig.forEach((item: string) => {
            $(`#${ newSelector }__control-${ item }`)
                .val(evaluateVarBind(`this.optionsState.${ item }`));
        });
    }
}

export default setControl;