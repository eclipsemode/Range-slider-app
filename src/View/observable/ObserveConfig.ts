import $ from "jquery";
import { ActionEnum, ModelOption } from "../../utils";

class ObserveConfig {
  constructor(
    private options: ModelOption,
    private handler: CallableFunction,
    private e: JQuery.TriggeredEvent
  ) {
    this.updateToggleConfig(e, handler);

    this.updateControlConfig(e, handler);
  }

  private updateToggleConfig(
    e: JQuery.TriggeredEvent,
    handler: CallableFunction
  ) {
    if ($(e.target).hasClass("slider-app__toggle--vertical")) {
      this.options.vertical = $(e.target).prop("checked");
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__toggle--range")) {
      this.options.range = $(e.target).prop("checked");
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__toggle--rulers")) {
      this.options.rulers = $(e.target).prop("checked");
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__toggle--progress")) {
      this.options.progress = $(e.target).prop("checked");
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__toggle--tooltip")) {
      this.options.tooltip = $(e.target).prop("checked");
      handler(this.options);
    }
  }

  private updateControlConfig(
    e: JQuery.TriggeredEvent,
    handler: CallableFunction
  ) {
    if ($(e.target).hasClass("slider-app__control--min")) {
      this.options.min = +$(e.target).val();
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__control--max")) {
      this.options.max = +$(e.target).val();
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__control--step")) {
      this.options.step = +$(e.target).val();
      handler(this.options);
    } else if ($(e.target).hasClass("slider-app__control--from")) {
      this.options.from = +$(e.target).val();
      handler(this.options, ActionEnum.DRAG_FROM);
    } else if ($(e.target).hasClass("slider-app__control--to")) {
      this.options.to = +$(e.target).val();
      handler(this.options, ActionEnum.DRAG_TO);
    }
  }
}

export default ObserveConfig;
