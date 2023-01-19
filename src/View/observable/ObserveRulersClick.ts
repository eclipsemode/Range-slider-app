import { ActionEnum, ModelOption } from "../../utils";

class ObserveRulersClick {
  constructor(
    private options: ModelOption,
    private handler: CallableFunction,
    private e: JQuery.MouseDownEvent
  ) {
    this.bindElement();
  }

  private bindElement() {
    if (this.e.target.classList.contains("slider-app__rulers-value")) {
      if (this.options.range) {
        if (
          Math.abs(+this.e.target.textContent - this.options.from) <
          Math.abs(+this.e.target.textContent - this.options.to)
        ) {
          this.options.from = +this.e.target.textContent;
          this.handler(this.options, ActionEnum.DRAG_FROM);
        } else {
          this.options.to = +this.e.target.textContent;
          this.handler(this.options, ActionEnum.DRAG_TO);
        }
      } else {
        this.options.from = +this.e.target.textContent;
        this.handler(this.options, ActionEnum.DRAG_FROM);
      }
    }
  }
}

export default ObserveRulersClick;
