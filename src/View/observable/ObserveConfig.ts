import $ from "jquery";
import { ActionEnum, ModelOption } from "../../utils";

class ObserveConfig {
  constructor(
    private options: ModelOption,
    private handler: CallableFunction,
    private e: JQuery.TriggeredEvent
  ) {
    this.updateToggleConfig();

    this.updateControlConfig(e, handler);
  }

  private updateToggleConfig() {
    this.options.vertical = $(`.slider-app__toggle--vertical`).prop("checked");
    this.options.range = $(`.slider-app__toggle--range`).prop("checked");
    this.options.rulers = $(`.slider-app__toggle--rulers`).prop("checked");
    this.options.progress = $(`.slider-app__toggle--progress`).prop("checked");
    this.options.tooltip = $(`.slider-app__toggle--tooltip`).prop("checked");
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
