import {
  ActionEnum,
  calcMouseOffset,
  convertToNumber,
  ModelOption,
} from "../../utils";

import { CreateBar } from "../subViews";

class SubscribeBarClick {
  constructor(
    private options: ModelOption,
    private bar: CreateBar,
    private handler: CallableFunction,
    private e: JQuery.MouseDownEvent
  ) {
    this.bindElement();
  }

  private bindElement() {
    const sliderWidth: number = this.bar.barElement.innerWidth();
    const sliderHeight: number = this.bar.barElement.innerHeight();
    const sliderLeftOffset: number = this.bar.barElement.offset().left;
    const sliderTopOffset: number = this.bar.barElement.offset().top;
    const clickedOffsetX: number = this.e.pageX - sliderLeftOffset;
    const clickedOffsetY: number = -(
      this.e.pageY -
      sliderTopOffset -
      sliderHeight
    );
    const valueCalculated: number = calcMouseOffset(
      this.options.vertical ? clickedOffsetY : clickedOffsetX,
      this.options.vertical ? sliderHeight : sliderWidth
    );
    const convertedValue: number = convertToNumber(
      valueCalculated,
      this.options.vertical ? sliderHeight : sliderWidth,
      this.options.min,
      this.options.max
    );

    if (this.options.range) {
      if (
        Math.abs(convertedValue - this.options.from) <
        Math.abs(convertedValue - this.options.to)
      ) {
        this.options.from = convertedValue;
        this.handler(this.options, ActionEnum.DRAG_FROM);
      } else {
        this.options.to = convertedValue;
        this.handler(this.options, ActionEnum.DRAG_TO);
      }
    } else {
      this.options.from = convertedValue;
      this.handler(this.options, ActionEnum.DRAG_FROM);
    }
  }
}

export default SubscribeBarClick;
