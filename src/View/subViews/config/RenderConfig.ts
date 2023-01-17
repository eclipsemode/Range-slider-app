import $ from "jquery";
import { CreateConfig } from "../index";
import { ModelOption } from "../../../utils";

class RenderConfig {
  public config: CreateConfig;

  constructor(
    private options: ModelOption,
    config: CreateConfig,
    private app: JQuery
  ) {
    this.config = config;
    if (this.options.configPanel) {
      if (!this.config) {
        this.config = new CreateConfig(
          this.app,
          this.options.toggleConfig,
          this.options.controlConfig
        );
      }
      const minInput: JQuery = $(".slider-app__control--min");
      const maxInput: JQuery = $(".slider-app__control--max");
      const stepInput: JQuery = $(".slider-app__control--step");
      const fromThumb: JQuery = $(".slider-app__control--from");
      const tuThumb: JQuery = $(".slider-app__control--to");

      minInput.val(this.options.min);
      maxInput.val(this.options.max);
      stepInput.val(this.options.step);
      fromThumb.val(this.options.from);
      tuThumb.val(this.options.to);

      fromThumb.prop("step", this.options.step);
      tuThumb.prop({
        step: this.options.step,
        disabled: !this.options.range,
      });

      $(".slider-app__toggle--vertical").prop("checked", this.options.vertical);
      $(".slider-app__toggle--range").prop("checked", this.options.range);
      $(".slider-app__toggle--rulers").prop("checked", this.options.rulers);
      $(".slider-app__toggle--progress").prop("checked", this.options.progress);
      $(".slider-app__toggle--tooltip").prop("checked", this.options.tooltip);
    } else if (this.config) {
      this.config.configElement.remove();
      this.config = null;
    }
  }
}

export default RenderConfig;
