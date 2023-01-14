import $ from "jquery";
import { ActionEnum, ControlsEnum, ModelOption } from "../../utils";

class ObserveConfig {
  constructor(
    private options: ModelOption,
    private handler: CallableFunction,
    private e: JQuery.TriggeredEvent
  ) {
    this.options.vertical = $(`.slider-app__toggle--vertical`).prop("checked");
    this.options.range = $(`.slider-app__toggle--range`).prop("checked");
    this.options.rulers = $(`.slider-app__toggle--rulers`).prop("checked");
    this.options.progress = $(`.slider-app__toggle--progress`).prop("checked");
    this.options.tooltip = $(`.slider-app__toggle--tooltip`).prop("checked");

    // if ($(e.target).hasClass("slider-app__toggle--range")) {
    //   this.options.range = $(`.slider-app__toggle--range`).prop("checked");
    //   handler(this.options, ActionEnum.CONFIG_RANGE);
    // }

    // this.options.toggleConfig.forEach((name) => {
    //   if (e.target.classList.contains(`slider-app__toggle--${name}`)) {
    //     if (name === TogglesEnum.RANGE) {
    //       this.options.range = $(`.slider-app__toggle--range`).prop("checked");
    //       // console.log(this.options.range);
    //       handler(this.options, ActionEnum.CONFIG_RANGE);
    //       return;
    //     }
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     this.options[name] = $(`.slider-app__toggle--${name}`).prop("checked");
    //   }
    // });

    this.options.controlConfig.forEach((name) => {
      const element: JQuery = $(`.slider-app__control--${name}`);
      if (e.target.classList.contains(`slider-app__control--${name}`)) {
        if (name === ControlsEnum.FROM) {
          this.options.from = +element.val();
          handler(this.options, ActionEnum.DRAG_FROM);
          return;
        }
        if (name === ControlsEnum.TO) {
          this.options.to = +element.val();
          handler(this.options, ActionEnum.DRAG_TO);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.options[name] = +element.val();
      }
    });
    handler(this.options);
  }
}

export default ObserveConfig;
