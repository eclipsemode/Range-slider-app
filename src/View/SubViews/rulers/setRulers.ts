import $ from "jquery";

import CreateRulers from "./CreateRulers";

import { abbreviateNumber, ClassName } from "../../../utils";

function setRulers(): void {
  const rulers: CreateRulers = new CreateRulers(this.selectorState);
  const $rulers = $(`${this.selectorState} ${ClassName.RULERS}`);
  const isRulersTrue: boolean = this.opts.rulers;

  if (isRulersTrue) {
    $rulers.length === 0 ? rulers.getRulers() : null;

    const isFindValueByPercent = (percent: number): number =>
      this.opts.min + ((this.opts.max - this.opts.min) * percent) / 100;

    const $values: JQuery = $(
      `${this.selectorState} ${ClassName.RULERS_VALUES}`
    );
    const $minThumb: JQuery = $(`${this.selectorState} ${ClassName.MIN}`);
    const $maxThumb: JQuery = $(`${this.selectorState} ${ClassName.MAX}`);

    $values.children().each((index, element) => {
      const minVal: number = this.opts.min;
      const maxVal: number = this.opts.max;
      const isPercentTrue: boolean = this.opts.percent;

      switch (index) {
        case 0:
          isPercentTrue
            ? (element.innerText = "0%")
            : (element.innerText = abbreviateNumber(maxVal, minVal, 0));

          element.addEventListener("click", () => {
            $minThumb.val(this.opts.min);
            this.opts.from = +$minThumb.val();
            this.setBar();
            this.setTooltip();
            this.setControl();
          });
          break;
        case 1:
          isPercentTrue
            ? (element.innerText = "20%")
            : (element.innerText = abbreviateNumber(maxVal, minVal, 20));

          element.addEventListener("click", () => {
            if (this.opts.range) {
              const isMinLessMaxWithGap: boolean =
                isFindValueByPercent(20) > this.opts.to - this.opts.gap;

              isMinLessMaxWithGap
                ? $minThumb.val(this.opts.to - this.opts.gap)
                : $minThumb.val(isFindValueByPercent(20));
            } else {
              $minThumb.val(isFindValueByPercent(20));
            }
            this.opts.from = +$minThumb.val();
            this.setBar();
            this.setTooltip();
            this.setControl();
          });
          break;
        case 2:
          isPercentTrue
            ? (element.innerText = "40%")
            : (element.innerText = abbreviateNumber(maxVal, minVal, 40));

          element.addEventListener("click", () => {
            if (this.opts.range) {
              const isMinLessMaxWithGap: boolean =
                isFindValueByPercent(40) > this.opts.to - this.opts.gap;

              isMinLessMaxWithGap
                ? $minThumb.val(this.opts.to - this.opts.gap)
                : $minThumb.val(isFindValueByPercent(40));
            } else {
              $minThumb.val(isFindValueByPercent(40));
            }
            this.opts.from = +$minThumb.val();
            this.setBar();
            this.setTooltip();
            this.setControl();
          });
          break;
        case 3:
          isPercentTrue
            ? (element.innerText = "60%")
            : (element.innerText = abbreviateNumber(maxVal, minVal, 60));

          element.addEventListener("click", () => {
            if (this.opts.range) {
              const isMaxMoreThanMinWithGap: boolean =
                isFindValueByPercent(60) < this.opts.from + this.opts.gap;

              isMaxMoreThanMinWithGap
                ? $maxThumb.val(this.opts.from + this.opts.gap)
                : $maxThumb.val(isFindValueByPercent(60));
              this.opts.to = +$maxThumb.val();
            } else {
              $minThumb.val(isFindValueByPercent(60));
              this.opts.from = +$minThumb.val();
            }
            this.setBar();
            this.setTooltip();
            this.setControl();
          });
          break;
        case 4:
          isPercentTrue
            ? (element.innerText = "80%")
            : (element.innerText = abbreviateNumber(maxVal, minVal, 80));

          element.addEventListener("click", () => {
            if (this.opts.range) {
              const isMaxMoreThanMinWithGap: boolean =
                isFindValueByPercent(80) < this.opts.from + this.opts.gap;

              isMaxMoreThanMinWithGap
                ? $maxThumb.val(this.opts.from + this.opts.gap)
                : $maxThumb.val(isFindValueByPercent(80));
              this.opts.to = +$maxThumb.val();
            } else {
              $minThumb.val(isFindValueByPercent(80));
              this.opts.from = +$minThumb.val();
            }
            this.setBar();
            this.setTooltip();
            this.setControl();
          });
          break;
        case 5:
          isPercentTrue
            ? (element.innerText = "100%")
            : (element.innerText = abbreviateNumber(maxVal, minVal, 100));

          element.addEventListener("click", () => {
            if (this.opts.range) {
              $maxThumb.val(this.opts.max);
              this.opts.to = +$maxThumb.val();
            } else {
              $minThumb.val(this.opts.max);
              this.opts.from = +$minThumb.val();
            }
            this.setBar();
            this.setTooltip();
            this.setControl();
          });
          break;
      }
    });
  } else {
    $rulers.remove();
    $(`${this.selectorState} .js-slider-app__rulers-values`).remove();
  }
}

export default setRulers;
