import $ from "jquery";
import {
  ActionEnum,
  calcMouseOffset,
  convertToNumber,
  ModelOption,
} from "../../utils";

import { CreateBar, CreateThumbFrom, CreateThumbTo } from "../subViews";

class SubscribeThumbsMove {
  constructor(
    private app: JQuery,
    private options: ModelOption,
    private bar: CreateBar,
    private fromThumb: CreateThumbFrom,
    private toThumb: CreateThumbTo,
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

    if (
      this.e.target.classList.contains(
        this.fromThumb?.fromThumbElement[0].classList[1]
      )
    ) {
      $(this.e.target).on("dragstart", () => false);

      const moveAt = (event: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => {
        const mouseOffsetX: number = event.pageX - sliderLeftOffset;
        const mouseOffsetY: number = -(
          event.pageY -
          sliderTopOffset -
          sliderHeight
        );
        const thumbOffsetValueX: number = calcMouseOffset(
          mouseOffsetX,
          sliderWidth
        );
        const thumbOffsetValueY: number = calcMouseOffset(
          mouseOffsetY,
          sliderHeight
        );

        const convertedValueX: number = convertToNumber(
          thumbOffsetValueX,
          sliderWidth,
          this.options.min,
          this.options.max
        );
        const convertedValueY: number = convertToNumber(
          thumbOffsetValueY,
          sliderHeight,
          this.options.min,
          this.options.max
        );

        if (!this.options.vertical) {
          this.options.from = convertedValueX;
        } else {
          this.options.from = convertedValueY;
        }

        this.handler(this.options, ActionEnum.DRAG_FROM);
      };

      moveAt(this.e);

      $(document).on("mousemove", (event) => moveAt(event));

      this.unbindElement();
    }

    if (
      this.options.range &&
      this.e.target.classList.contains(
        this.toThumb?.toThumbElement[0].classList[1]
      )
    ) {
      $(this.e.target).on("dragstart", () => false);

      const moveAt = (event: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => {
        const mouseOffsetX: number = event.pageX - sliderLeftOffset;
        const mouseOffsetY: number = -(
          event.pageY -
          sliderTopOffset -
          sliderHeight
        );
        const thumbOffsetValueX: number = calcMouseOffset(
          mouseOffsetX,
          sliderWidth
        );
        const thumbOffsetValueY: number = calcMouseOffset(
          mouseOffsetY,
          sliderHeight
        );

        const convertedValueX: number = convertToNumber(
          thumbOffsetValueX,
          sliderWidth,
          this.options.min,
          this.options.max
        );
        const convertedValueY: number = convertToNumber(
          thumbOffsetValueY,
          sliderHeight,
          this.options.min,
          this.options.max
        );

        if (!this.options.vertical) {
          this.options.to = convertedValueX;
        } else {
          this.options.to = convertedValueY;
        }

        this.handler(this.options, ActionEnum.DRAG_TO);
      };

      moveAt(this.e);

      $(document).on(
        "mousemove",
        (event: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => moveAt(event)
      );

      this.unbindElement();
    }
  }

  private unbindElement() {
    $(this.e.target).on("mouseleave", () => {
      $(document).on("mouseup", () => {
        $(document).off("mousemove");
        $(document).off("mouseup");
        $(this.e.target).off("mouseleave");
      });
    });
    $(this.e.target).on("mouseup", () => {
      $(document).off("mousemove");
      $(this.e.target).off("mouseup");
    });
  }
}

export default SubscribeThumbsMove;
