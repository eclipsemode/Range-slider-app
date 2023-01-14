import $ from "jquery";
import {
  ActionEnum,
  calcMouseOffset,
  convertToNumber,
  ModelOption,
} from "../../utils";
import CreateBar from "../subViews/bar/CreateBar";
import CreateThumbFrom from "../subViews/CreateThumbFrom";
import CreateThumbTo from "../subViews/CreateThumbTo";

class ObserveThumbsMove {
  constructor(
    private app: JQuery,
    private options: ModelOption,
    private bar: CreateBar,
    private fromThumb: CreateThumbFrom,
    private toThumb: CreateThumbTo,
    private handler: CallableFunction,
    private e: JQuery.MouseDownEvent
  ) {
    const sliderWidth: number = this.bar.barElement.innerWidth();
    const sliderHeight: number = this.bar.barElement.innerHeight();
    const sliderLeftOffset: number = this.bar.barElement.offset().left;
    const sliderTopOffset: number = this.bar.barElement.offset().top;

    if (
      e.target.classList.contains(
        this.fromThumb?.fromThumbElement[0].classList[1]
      )
    ) {
      $(e.target).on("dragstart", () => false);

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

        handler(this.options, ActionEnum.DRAG_FROM);
      };

      moveAt(e);

      $(document).on("mousemove", (event) => moveAt(event));

      $(e.target).on("mouseleave", () => {
        $(document).on("mouseup", () => {
          $(document).off("mousemove");
          $(document).off("mouseup");
          $(e.target).off("mouseleave");
        });
      });
      $(e.target).on("mouseup", () => {
        $(document).off("mousemove");
        $(e.target).off("mouseup");
      });
    }

    if (
      this.options.range &&
      e.target.classList.contains(this.toThumb?.toThumbElement[0].classList[1])
    ) {
      $(e.target).on("dragstart", () => false);

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

        handler(this.options, ActionEnum.DRAG_TO);
      };

      moveAt(e);

      $(document).on(
        "mousemove",
        (event: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => moveAt(event)
      );

      $(e.target).on("mouseleave", () => {
        $(document).on("mouseup", () => {
          $(document).off("mousemove");
          $(document).off("mouseup");
          $(e.target).off("mouseleave");
        });
      });
      $(e.target).on("mouseup", () => {
        $(document).off("mousemove");
        $(e.target).off("mouseup");
      });
    }
  }
}

export default ObserveThumbsMove;
