import { ActionEnum, ModelOption } from "../../utils";

class ObserveRulersClick {
  constructor(
    private options: ModelOption,
    private handler: CallableFunction,
    private e: JQuery.MouseDownEvent
  ) {
    if (e.target.classList.contains("slider-app__rulers-value")) {
      if (this.options.range) {
        if (
          Math.abs(+e.target.textContent - this.options.from) <
          Math.abs(+e.target.textContent - this.options.to)
        ) {
          this.options.from = +e.target.textContent;
          handler(this.options, ActionEnum.DRAG_FROM);
        } else {
          this.options.to = +e.target.textContent;
          handler(this.options, ActionEnum.DRAG_TO);
        }
      } else {
        this.options.from = +e.target.textContent;
        handler(this.options, ActionEnum.DRAG_FROM);
      }
    }
  }
}

export default ObserveRulersClick;
