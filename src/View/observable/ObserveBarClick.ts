import {
  ActionEnum,
  calcMouseOffset,
  convertToNumber,
  ModelOption,
} from "../../utils";
import CreateBar from "../subViews/bar/CreateBar";

class ObserveBarClick {
  constructor(
    private options: ModelOption,
    private bar: CreateBar,
    private handler: CallableFunction,
    private e: JQuery.MouseDownEvent
  ) {
    const sliderWidth: number = this.bar.barElement.innerWidth();
    const sliderHeight: number = this.bar.barElement.innerHeight();
    const sliderLeftOffset: number = this.bar.barElement.offset().left;
    const sliderTopOffset: number = this.bar.barElement.offset().top;
    const clickedOffsetX: number = e.pageX - sliderLeftOffset;
    const clickedOffsetY: number = -(e.pageY - sliderTopOffset - sliderHeight);
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
        handler(this.options, ActionEnum.DRAG_FROM);
      } else {
        this.options.to = convertedValue;
        handler(this.options, ActionEnum.DRAG_TO);
      }
    } else {
      this.options.from = convertedValue;
      handler(this.options, ActionEnum.DRAG_FROM);
    }
  }
}

export default ObserveBarClick;
