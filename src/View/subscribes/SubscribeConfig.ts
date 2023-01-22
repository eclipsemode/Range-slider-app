import $ from "jquery";
import { ActionEnum, ModelOption } from "../../utils";

class SubscribeConfig {
  constructor(
    private options: ModelOption,
    private handler: CallableFunction,
    private e: JQuery.TriggeredEvent
  ) {
    this.updateToggleConfig();

    this.updateControlConfig();
  }

  private updateToggleConfig() {
    if ($(this.e.target).hasClass("slider-app__toggle--vertical")) {
      this.options.vertical = $(this.e.target).prop("checked");
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__toggle--range")) {
      this.options.range = $(this.e.target).prop("checked");
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__toggle--rulers")) {
      this.options.rulers = $(this.e.target).prop("checked");
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__toggle--progress")) {
      this.options.progress = $(this.e.target).prop("checked");
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__toggle--tooltip")) {
      this.options.tooltip = $(this.e.target).prop("checked");
      this.handler(this.options);
    }
  }

  private updateControlConfig() {
    if ($(this.e.target).hasClass("slider-app__control--min")) {
      this.options.min = +$(this.e.target).val();
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__control--max")) {
      this.options.max = +$(this.e.target).val();
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__control--step")) {
      this.options.step = +$(this.e.target).val();
      this.handler(this.options);
    } else if ($(this.e.target).hasClass("slider-app__control--from")) {
      this.options.from = +$(this.e.target).val();
      this.handler(this.options, ActionEnum.DRAG_FROM);
    } else if ($(this.e.target).hasClass("slider-app__control--to")) {
      this.options.to = +$(this.e.target).val();
      this.handler(this.options, ActionEnum.DRAG_TO);
    }
  }
}

export default SubscribeConfig;
