import $ from "jquery";
import { ModelOption, convertToNumber } from "../utils";

import CreateBar from "./subViews/CreateBar";
import CreateThumbFrom from "./subViews/CreateThumbFrom";
import CreateThumbTo from "./subViews/CreateThumbTo";
import CreateProgress from "./subViews/CreateProgress";
import CreateTooltip from "./subViews/CreateTooltip";
import CreateRulers from "./subViews/CreateRulers";

function calcMouseOffset(mouseOffset: number, sliderWidth: number): number {
  if (mouseOffset < 0) {
    return 0;
  }
  if (mouseOffset > sliderWidth) {
    return sliderWidth;
  }
  return mouseOffset;
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

  private tooltipFrom: CreateTooltip;

  private tooltipTo: CreateTooltip;

  private rulers: CreateRulers;

  private options: ModelOption;

  constructor(private readonly selector: string) {
    this.app = $(selector);
    this.bar = new CreateBar(this.app);
    this.fromThumb = new CreateThumbFrom(this.bar.barElement);
  }

  public bindChangeOptions(handler: CallableFunction) {
    /**
     * Binds thumbs.
     */

    this.app.on("mousedown", (e: JQuery.MouseDownEvent) => {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderLeftOffset: number = this.bar.barElement.offset().left;

      if (
        e.target.classList.contains(
          this.fromThumb.fromThumbElement[0].classList[1]
        )
      ) {
        $(e.target).on("dragstart", () => false);

        // eslint-disable-next-line @typescript-eslint/no-shadow
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

          if (this.options.range) {
            if (this.options.from > this.options.to - this.options.gap) {
              this.options.from = this.options.to - this.options.gap;
            }
          }

          handler(this.options);
        };

        moveAt(e);

        // eslint-disable-next-line @typescript-eslint/no-shadow
        $(document).on("mousemove", (e) => moveAt(e));

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
        e.target.classList.contains(
          this.options.range && this.toThumb.toThumbElement[0].classList[1]
        )
      ) {
        $(e.target).on("dragstart", () => false);

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const moveAt = (e: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => {
          const mouseOffset: number = e.pageX - sliderLeftOffset;
          const thumbOffsetValue: number = calcMouseOffset(
            mouseOffset,
            sliderWidth
          );

          this.options.to = convertToNumber(
            thumbOffsetValue,
            sliderWidth,
            this.options.min,
            this.options.max
          );

          if (this.options.to < this.options.from + this.options.gap) {
            this.options.to = this.options.from + this.options.gap;
          }
          handler(this.options);
        };

        moveAt(e);

        $(document).on(
          "mousemove",
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (e: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => moveAt(e)
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
    });

    /**
     * Binds thumbs move.
     */

    this.bar?.barElement.on("click", (e) => {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderLeftOffset: number = this.bar.barElement.offset().left;
      const clickedOffset: number = e.pageX - sliderLeftOffset;
      const valueCalculated: number = calcMouseOffset(
        clickedOffset,
        sliderWidth
      );
      const convertedValue: number = convertToNumber(
        valueCalculated,
        sliderWidth,
        this.options.min,
        this.options.max
      );

      if (this.options.range) {
        if (
          Math.abs(convertedValue - this.options.from) <
          Math.abs(convertedValue - this.options.to)
        ) {
          this.options.from = convertedValue;
        } else {
          this.options.to = convertedValue;
        }
      } else {
        this.options.from = convertedValue;
      }
      handler(this.options);
    });

    /**
     * Binds rulers values.
     */

    $(this.app).on("click", (e) => {
      if (e.target.classList.contains("slider-app__rulers-value")) {
        if (this.options.range) {
          if (
            Math.abs(+e.target.textContent - this.options.from) <
            Math.abs(+e.target.textContent - this.options.to)
          ) {
            this.options.from = +e.target.textContent;
          } else {
            this.options.to = +e.target.textContent;
          }
        } else {
          this.options.from = +e.target.textContent;
        }
      }
      handler(this.options);
    });

    $(".test").on("click", () => {
      this.options.range = !this.options.range;
      handler(this.options);
    });

    /**
     * Binds resize window.
     */

    $(window).on("resize", () => handler(this.options));
  }

  public render(options: ModelOption) {
    this.options = options;

    /**
     * Creates Tooltip.
     */
    if (this.options.tooltip) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      if (!this.tooltipFrom) {
        this.tooltipFrom = new CreateTooltip(this.bar.barElement);
      }
      this.bar.barElement.css("margin-top", "2em");
      this.tooltipFrom.tooltipElement.css(
        "left",
        `${convertToPixel(
          this.options.from,
          sliderWidth,
          this.options.min,
          this.options.max
        )}px`
      );
      this.tooltipFrom.tooltipElement.text(this.options.from);

      if (this.options.range) {
        if (!this.tooltipTo) {
          this.tooltipTo = new CreateTooltip(this.bar.barElement);
        }

        this.tooltipTo.tooltipElement.css(
          "left",
          `${convertToPixel(
            this.options.to,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`
        );
        this.tooltipTo.tooltipElement.text(this.options.to);
      } else if (this.tooltipTo) {
        this.tooltipTo.tooltipElement.remove();
        this.tooltipTo = null;
      }
    } else {
      if (this.tooltipFrom) {
        this.tooltipFrom.tooltipElement.remove();
        this.tooltipFrom = null;
      }

      if (this.tooltipTo) {
        this.tooltipTo.tooltipElement.remove();
        this.tooltipTo = null;
      }

      this.bar.barElement.css("margin-top", "auto");
      // this.app.css("padding", "1em 1.5em 1em");
    }

    /**
     * Creates Progress.
     */
    if (this.options.progress) {
      if (!this.progress) {
        this.progress = new CreateProgress(this.bar.barElement);
      }

      if (!this.options.range) {
        this.progress.progressElement.css("left", "auto");
      }
    } else if (!this.options.progress) {
      this.progress.progressElement.remove();
      this.progress = null;
    }

    /**
     * Changes css of thumb position.
     */
    if (this.options.range) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      if (!this.toThumb) {
        this.toThumb = new CreateThumbTo(this.bar.barElement);
      }

      this.fromThumb.fromThumbElement.css(
        "left",
        `${convertToPixel(
          this.options.from,
          sliderWidth,
          this.options.min,
          this.options.max
        )}px`
      );

      this.toThumb.toThumbElement.css(
        "left",
        `${convertToPixel(
          this.options.to,
          sliderWidth,
          this.options.min,
          this.options.max
        )}px`
      );

      if (this.progress?.progressElement) {
        this.progress.progressElement.css(
          "left",
          `${convertToPixel(
            this.options.from,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`
        );

        this.progress.progressElement.css(
          "width",
          `${
            convertToPixel(
              this.options.to,
              sliderWidth,
              this.options.min,
              this.options.max
            ) -
            convertToPixel(
              this.options.from,
              sliderWidth,
              this.options.min,
              this.options.max
            )
          }px`
        );
      }
    } else {
      const sliderWidth: number = this.bar.barElement.innerWidth();

      if (this.toThumb) {
        this.toThumb.toThumbElement.remove();
        this.toThumb = null;
      }

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

    /**
     * Creates Rulers.
     */

    if (this.options.rulers) {
      if (this.rulers) {
        this.rulers.rulersElement.remove();
        this.rulers = null;
      }

      if (!this.rulers) {
        const sliderWidth: number = this.bar.barElement.innerWidth();
        const gap = 125;
        const amountValues: number = Math.round(sliderWidth / gap);
        const gapValues: number = sliderWidth / amountValues;
        const valuesArr: number[] = [];
        const pixelsArr: number[] = [];

        for (let i = 0; i < sliderWidth + gapValues; i += gapValues) {
          valuesArr.push(
            convertToNumber(i, sliderWidth, this.options.min, this.options.max)
          );
          pixelsArr.push(i);
        }
        this.rulers = new CreateRulers(this.app, valuesArr, pixelsArr);
      }
    } else {
      this.rulers.rulersElement.remove();
      this.rulers = null;
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
