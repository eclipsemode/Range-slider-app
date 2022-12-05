import $ from "jquery";

import { CreateConfigPanel } from "../../components";

import { ClassName, evaluateVar } from "../../utils";

function setControl(): void {
  const configPanel: CreateConfigPanel = new CreateConfigPanel(
    this.selectorState,
    this.opts.controlConfig,
    this.opts.toggleConfig
  );
  const isConfigPanelTrue: boolean = this.opts.configPanel;
  const evaluateVarBind: CallableFunction = evaluateVar.bind(this);
  const configPanelElement: JQuery = $(
    `${this.selectorState} ${ClassName.CONFIG}`
  );

  if (isConfigPanelTrue) {
    const isGetConfigPanelIfMissing = () =>
      configPanelElement.length === 0 ? configPanel.getConfig() : null;

    isGetConfigPanelIfMissing();

    const newSelector: string = this.selectorState.slice(1);
    const $controlTo = $(`.${newSelector}__control-to`);
    const $controlFrom = $(`.${newSelector}__control-from`);
    const $controlMin = $(`.${newSelector}__control-min`);
    const $controlMax = $(`.${newSelector}__control-max`);
    const $controlStep = $(`.${newSelector}__control-step`);

    $controlMin.prop({
      step: this.opts.step,
      max: this.opts.max - this.opts.step,
    });
    $controlMax.prop({
      step: this.opts.step,
    });

    $controlStep.prop({
      min: 1,
      max: this.opts.max - this.opts.min,
    });

    $controlFrom.prop({
      min: this.opts.min,
      max: this.opts.max,
      step: this.opts.step,
    });

    $controlTo.prop({
      min: this.opts.min,
      max: this.opts.max,
      step: this.opts.step,
    });

    this.opts.controlConfig.forEach((item: string) => {
      $(`.${newSelector}__control-${item}`).val(
        evaluateVarBind(`this.opts.${item}`)
      );
    });
  }
}

export default setControl;
