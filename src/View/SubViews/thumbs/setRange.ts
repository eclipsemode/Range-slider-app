import $ from "jquery";

import CreateThumb from "./CreateThumb";
import { ClassName, progressCalc } from "../../../utils";
import offsetCalc from "../../../utils/offsetCalc";

function calcMouseOffset(mouseOffset: number, sliderWidth: number): number {
  if (mouseOffset < 0) {
    return 0;
  }
  if (mouseOffset > sliderWidth) {
    return sliderWidth;
  }
  return mouseOffset;
}

function setRange(): void {
  const thumb: CreateThumb = new CreateThumb(this.selectorState);
  const isRangeTrue: boolean = this.opts.range;
  const isProgressTrue: boolean = this.opts.progress;

  // const checkValueThumbs = (from: number, to: number, max: number, gap: number, step: number) => {
  //     if (from > to - gap) {
  //         to - step > to - gap ? this.opts.from = to - gap : this.opts.from = to - step;
  //     }
  // };

  if (isRangeTrue) {
    // const $thumbMin = $(this.selectorState + ' ' + '.js-slider-app__thumb-min');
    // const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);
    //
    // checkValueThumbs(this.opts.from, this.opts.to, this.opts.max, this.opts.gap, this.opts.step);
    // $thumbMin.length === 0
    //     ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;
    // $thumbMax.length === 0
    //     ? thumb.getMaxThumb(this.opts.min, this.opts.max, this.opts.to, this.opts.step) : null;
    // this.opts.to = +$(this.selectorState + ' ' + ClassName.MAX).val();
  } else {
    $(`${this.selectorState} ${ClassName.MAX}`).length !== 0
      ? $(`${this.selectorState} ${ClassName.MAX}`).remove()
      : null;
    $(`${this.selectorState} ` + `.js-slider-app__thumb-min`).length === 0
      ? thumb.getMinThumb(
          this.opts.min,
          this.opts.max,
          this.opts.from,
          this.opts.step
        )
      : null;

    const $thumbMin: JQuery = $(`${this.selectorState} ${ClassName.MIN}`);
    const $progress: JQuery = $(`${this.selectorState} ${ClassName.PROGRESS}`);

    $thumbMin.on("mousedown", (e) => {
      const $barLine: JQuery = $(`${this.selectorState} .js-slider-app__line`);
      const sliderWidth: number = $barLine.innerWidth();
      const sliderLeftOffset: number = $barLine.offset().left;

      $thumbMin.on("dragstart", () => false);

      const moveAt = (e: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => {
        const mouseOffset: number = e.pageX - sliderLeftOffset;
        const thumbOffsetValue: number = calcMouseOffset(
          mouseOffset,
          sliderWidth
        );

        this.opts.from =
          (Math.ceil(progressCalc(e, sliderWidth, $barLine)) / 100) *
            (this.opts.max - this.opts.min) -
          this.opts.max;
        $thumbMin.css("left", `${thumbOffsetValue}px`);

        if (isProgressTrue) {
          $(document).on("mousemove", () => {
            $progress.css("width", `${thumbOffsetValue}px`);
          });
        }
      };

      moveAt(e);

      $(document).on("mousemove", (e) => moveAt(e));

      $thumbMin.on("mouseleave", () => {
        $(document).on("mouseup", () => {
          $(document).off("mousemove");
          $(document).off("mouseup");
          $thumbMin.off("mouseleave");
        });
      });
      $thumbMin.on("mouseup", () => {
        $(document).off("mousemove");
        $thumbMin.off("mouseup");
      });
    });

    // if (isProgressTrue) {
    //     $thumbMin.on('mousedown', () => {
    //         $(document).on('mousemove', () => {
    //             $progress.css('width', (this.opts.from + this.opts.max) / (this.opts.max - this.opts.min) * 100 + '%');
    //         });
    //     });
    // }
  }
}

export default setRange;
