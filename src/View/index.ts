import $ from "jquery";
import { ModelOption } from "../utils";

import CreateBar from "./subViews/CreateBar";
import CreateThumbFrom from "./subViews/CreateThumbFrom";
import CreateThumbTo from "./subViews/CreateThumbTo";
import CreateProgress from "./subViews/CreateProgress";

// import {
//   setBar,
//   setProgress,
//   setRoot,
//   setRulers,
//   setRange,
//   setTooltip,
//   setColor,
//   setVertical,
//   setControl,
//   setConfig,
// } from "./SubViewsOld";
// import { observeThumbs, observeControl, observeConfig } from "../Observer";

function calcMouseOffset(mouseOffset: number, sliderWidth: number): number {
  if (mouseOffset < 0) {
    return 0;
  }
  if (mouseOffset > sliderWidth) {
    return sliderWidth;
  }
  return mouseOffset;
}

function convertToNumber(
  mouseOffset: number,
  sliderWidth: number,
  min: number,
  max: number
): number {
  if (min < 0) {
    return Math.round(min + (mouseOffset / sliderWidth) * (max - min));
  }
  if (min > 0) {
    return Math.round((mouseOffset / sliderWidth) * (max - min) + min);
  }
  return Math.round((mouseOffset / sliderWidth) * max);
}

function convertToPixel(
  value: number,
  sliderWidth: number,
  min: number,
  max: number
): number {
  if (min < 0) {
    const newMax: number = max + Math.abs(min);
    const newValue: number = value + Math.abs(min);
    return Math.round((newValue / newMax) * sliderWidth);
  }
  if (min > 0) {
    const newMax: number = max - min;
    const newValue: number = value - min;
    return Math.round((newValue / newMax) * sliderWidth);
  }
  return Math.round((value / max) * sliderWidth);
}

class View {
  private readonly app: JQuery;

  private readonly bar: CreateBar;

  private fromThumb: CreateThumbFrom;

  private toThumb: CreateThumbTo;

  private progress: CreateProgress;

  private options: Partial<ModelOption>;

  constructor(private readonly selector: string) {
    this.app = $(selector);
    this.bar = new CreateBar(this.app);
    this.fromThumb = new CreateThumbFrom(this.bar.barElement);
  }

  public bindChangeOptions(handler: CallableFunction) {
    this.fromThumb.fromThumbElement.on("mousedown", (e) => {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderLeftOffset: number = this.bar.barElement.offset().left;

      this.fromThumb.fromThumbElement.on("dragstart", () => false);

      const moveAt = (e: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => {
        const mouseOffset: number = e.pageX - sliderLeftOffset;
        const thumbOffsetValue: number = calcMouseOffset(
          mouseOffset,
          sliderWidth
        );

        this.options.from = convertToNumber(
          thumbOffsetValue,
          sliderWidth,
          this.options.min,
          this.options.max
        );
        handler(this.options);
      };

      moveAt(e);

      $(document).on("mousemove", (e) => moveAt(e));

      this.fromThumb.fromThumbElement.on("mouseleave", () => {
        $(document).on("mouseup", () => {
          $(document).off("mousemove");
          $(document).off("mouseup");
          this.fromThumb.fromThumbElement.off("mouseleave");
        });
      });
      this.fromThumb.fromThumbElement.on("mouseup", () => {
        $(document).off("mousemove");
        this.fromThumb.fromThumbElement.off("mouseup");
      });
    });
  }

  public render(options: ModelOption) {
    this.options = options;

    if (this.options.range) {
      this.toThumb = new CreateThumbTo(this.bar.barElement);
    } else if (this.toThumb && !this.options.range) {
      this.toThumb.toThumbElement.remove();
    }

    if (this.options.progress && !this.progress?.progressElement) {
      this.progress = new CreateProgress(this.bar.barElement);
    } else if (!this.options.progress) {
      this.progress.progressElement.remove();
      this.progress = null;
    }

    if (this.options.range) {
      console.log(2);
    } else {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      this.fromThumb.fromThumbElement.css(
        "left",
        `${convertToPixel(
          this.options.from,
          sliderWidth,
          this.options.min,
          this.options.max
        )}px`
      );

      if (this.progress?.progressElement) {
        this.progress.progressElement.css(
          "width",
          `${convertToPixel(
            this.options.from,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`
        );
      }
    }
  }

  // private readonly selectorState: string;
  //
  // private readonly optionsState: ModelOption;
  //
  // private readonly setRoot: typeof setRoot;
  //
  // private readonly setRange: typeof setRange;
  //
  // private readonly setRulers: typeof setRulers;
  //
  // private readonly setBar: typeof setBar;
  //
  // private readonly setProgress: typeof setProgress;
  //
  // private readonly setTooltip: typeof setTooltip;
  //
  // private readonly setColor: typeof setColor;
  //
  // private readonly setVertical: typeof setVertical;
  //
  // private readonly setControl: typeof setControl;
  //
  // private readonly setConfig: typeof setConfig;
  //
  // private readonly observeThumbs: typeof observeThumbs;
  //
  // private readonly observeControl: typeof observeControl;
  //
  // private readonly observeConfig: typeof observeConfig;
  //
  // constructor(private selector: string, private options: ModelOption) {
  //   super();
  //   this.selectorState = selector;
  //   this.optionsState = options;
  //   this.setRoot = setRoot.bind(this);
  //   // this.setRulers = setRulers.bind(this);
  //   this.setRange = setRange.bind(this);
  //   this.setBar = setBar.bind(this);
  //   this.setProgress = setProgress.bind(this);
  //   // this.setTooltip = setTooltip.bind(this);
  //   // this.setColor = setColor.bind(this);
  //   // this.setVertical = setVertical.bind(this);
  //   // this.setControl = setControl.bind(this);
  //   // this.setConfig = setConfig.bind(this);
  //   // this.observeThumbs = observeThumbs.bind(this);
  //   // this.observeControl = observeControl.bind(this);
  //   // this.observeConfig = observeConfig.bind(this);
  // }
  //
  // render(): void {
  //   this.opts = this.optionsState;
  //   this.setRoot();
  //   this.setBar();
  //   this.setProgress();
  //   this.setRange();
  //   // this.setRulers();
  //   // this.setColor();
  //   // this.setControl();
  //   // this.setConfig();
  //   // this.setTooltip();
  //   // this.setVertical();
  //
  //   // this.thumbsObserver();
  //   // this.controlObserver();
  //   // this.configObserver();
  //
  //
  // }
  //
  // thumbsObserver() {
  //   const ObserveThumbs = this.observeThumbs();
  //   const $thumbs: JQuery = $(".js-slider-app__input");
  //   const $thumbMin = $(`${this.selectorState} ${ClassName.MIN}`);
  //   const $thumbMax = $(`${this.selectorState} ${ClassName.MAX}`);
  //
  //   const handleObserver = (e: JQuery.ChangeEvent) => {
  //     if ($(e.currentTarget).hasClass("js-slider-app__input-min")) {
  //       if (
  //         +$thumbMin.val() > +$thumbMax.val() - this.opts.gap &&
  //         this.opts.range
  //       ) {
  //         +$thumbMax.val() - this.opts.step < +$thumbMax.val() - this.opts.gap
  //           ? $thumbMin.val(+$thumbMax.val() - this.opts.step)
  //           : $thumbMin.val(+$thumbMax.val() - this.opts.gap);
  //       }
  //
  //       ObserveThumbs.opts = {
  //         ...this.opts,
  //         from: +e.target.value,
  //       };
  //     } else {
  //       if (+$thumbMin.val() > +$thumbMax.val() - this.opts.gap) {
  //         +$thumbMin.val() + this.opts.step > +$thumbMin.val() + this.opts.gap
  //           ? $thumbMax.val(+$thumbMin.val() + this.opts.step)
  //           : $thumbMax.val(+$thumbMin.val() + this.opts.gap);
  //       }
  //
  //       ObserveThumbs.opts = {
  //         ...this.opts,
  //         to: +e.target.value,
  //       };
  //     }
  //   };
  //
  //   $thumbs.off("input", handleObserver);
  //   $thumbs.on("input", handleObserver);
  // }
  //
  // controlObserver() {
  //   const ObserveControl = this.observeControl();
  //
  //   this.opts.controlConfig.forEach((item: string): void => {
  //     const $element: JQuery = $(`${this.selectorState}__control-${item}`);
  //
  //     const handleObserver = (e: JQuery.ChangeEvent) => {
  //       const $thumbMin = $(`${this.selectorState} ${ClassName.MIN}`);
  //       const $thumbMax = $(`${this.selectorState} ${ClassName.MAX}`);
  //       switch (item) {
  //         case ControlsEnum.MIN:
  //           if (+e.target.value > this.opts.max - this.opts.gap) {
  //             e.target.value = this.opts.max - this.opts.gap;
  //           }
  //           ObserveControl.opts = {
  //             ...this.opts,
  //             min: +e.target.value,
  //           };
  //           break;
  //         case ControlsEnum.MAX:
  //           if (+e.target.value < this.opts.min + this.opts.gap) {
  //             e.target.value = this.opts.min + this.opts.gap;
  //           }
  //           ObserveControl.opts = {
  //             ...this.opts,
  //             max: +e.target.value,
  //           };
  //           break;
  //         case ControlsEnum.STEP:
  //           if (+e.target.value > this.opts.max - this.opts.min) {
  //             e.target.value = this.opts.max - this.opts.min;
  //           }
  //           ObserveControl.opts = {
  //             ...this.opts,
  //             step: +e.target.value,
  //           };
  //           break;
  //         case ControlsEnum.FROM:
  //           if (
  //             +e.target.value > +$thumbMax.val() - this.opts.gap &&
  //             this.opts.range
  //           ) {
  //             +$thumbMax.val() - this.opts.step <
  //             +$thumbMax.val() - this.opts.gap
  //               ? (e.target.value = +$thumbMax.val() - this.opts.step)
  //               : (e.target.value = +$thumbMax.val() - this.opts.gap);
  //           }
  //
  //           ObserveControl.opts = {
  //             ...this.opts,
  //             from: +e.target.value,
  //           };
  //           break;
  //         case ControlsEnum.TO:
  //           if (+$thumbMin.val() > +e.target.value - this.opts.gap) {
  //             +$thumbMin.val() + this.opts.step >
  //             +$thumbMin.val() + this.opts.gap
  //               ? (e.target.value = +$thumbMin.val() + this.opts.step)
  //               : (e.target.value = +$thumbMin.val() + this.opts.gap);
  //           }
  //
  //           ObserveControl.opts = {
  //             ...this.opts,
  //             to: +e.target.value,
  //           };
  //           break;
  //       }
  //     };
  //
  //     $element.off("change", handleObserver);
  //     $element.on("change", handleObserver);
  //   });
  // }
  //
  // configObserver() {
  //   const ObserveConfig = this.observeConfig();
  //
  //   this.opts.toggleConfig.forEach((item: string): void => {
  //     const $element: JQuery = $(`${this.selectorState}__toggle-${item}`);
  //
  //     const handleObserver = (e: JQuery.ChangeEvent) => {
  //       // eslint-disable-next-line default-case
  //       switch (item) {
  //         case TogglesEnum.VERTICAL:
  //           ObserveConfig.opts = {
  //             ...this.opts,
  //             vertical: e.target.checked,
  //           };
  //           break;
  //         case TogglesEnum.RANGE:
  //           ObserveConfig.opts = {
  //             ...this.opts,
  //             range: e.target.checked,
  //           };
  //           break;
  //         case TogglesEnum.RULERS:
  //           ObserveConfig.opts = {
  //             ...this.opts,
  //             rulers: e.target.checked,
  //           };
  //           break;
  //         case TogglesEnum.PROGRESS:
  //           ObserveConfig.opts = {
  //             ...this.opts,
  //             progress: e.target.checked,
  //           };
  //           break;
  //         case TogglesEnum.TOOLTIP:
  //           ObserveConfig.opts = {
  //             ...this.opts,
  //             tooltip: e.target.checked,
  //           };
  //           break;
  //       }
  //     };
  //
  //     $element.off("change", handleObserver);
  //     $element.on("change", handleObserver);
  //   });
  // }
}

export default View;
