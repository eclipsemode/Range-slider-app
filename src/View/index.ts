import $ from "jquery";
import {
  ModelOption,
  convertToNumber,
  ControlsEnum,
  ActionEnum,
} from "../utils";

import CreateBar from "./subViews/CreateBar";
import CreateThumbFrom from "./subViews/CreateThumbFrom";
import CreateThumbTo from "./subViews/CreateThumbTo";
import CreateProgress from "./subViews/CreateProgress";
import CreateTooltip from "./subViews/CreateTooltip";
import CreateRulers from "./subViews/CreateRulers";
import CreateConfig from "./subViews/CreateConfig";

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

  private config: CreateConfig;

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

          handler(this.options, ActionEnum.DRAG_FROM);
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

          handler(this.options, ActionEnum.DRAG_TO);
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
          handler(this.options, ActionEnum.CLICK_FROM);
        } else {
          this.options.to = convertedValue;
          handler(this.options, ActionEnum.CLICK_TO);
        }
      } else {
        this.options.from = convertedValue;
        handler(this.options);
      }
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

    /**
     * Binds toggles.
     */

    this.app.on("input", (e) => {
      this.options.toggleConfig.forEach((name) => {
        if (e.target.classList.contains(`slider-app__toggle--${name}`)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.options[name] = $(`.slider-app__toggle--${name}`).prop(
            "checked"
          );
        }
      });

      this.options.controlConfig.forEach((name) => {
        const element: JQuery = $(`.slider-app__control--${name}`);
        if (e.target.classList.contains(`slider-app__control--${name}`)) {
          if (name === ControlsEnum.FROM) {
            if (element.val() > this.options.to - this.options.gap) {
              element.val(this.options.to - this.options.gap);
            }
          }
          if (name === ControlsEnum.TO) {
            if (element.val() < this.options.from + this.options.gap) {
              element.val(this.options.from + this.options.gap);
            }
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.options[name] = element.val();
        }
      });
      handler(this.options);
    });

    // this.app.on("input", (e) => {
    //   if (e.target.classList.contains("slider-app__control--from")) {
    //     if (
    //       +$(`.slider-app__control--from`).val() >
    //       this.options.to - this.options.gap
    //     ) {
    //       $(`.slider-app__control--from`).val(
    //         this.options.to - this.options.gap
    //       );
    //     }
    //     this.options.from = +$(`.slider-app__control--from`).val();
    //   }
    // });

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
    } else if (this.progress) {
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
        this.rulers.rulersElement?.remove();
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
        this.rulers = new CreateRulers(
          this.bar.barElement,
          valuesArr,
          pixelsArr
        );
      }
    } else if (this.rulers) {
      this.rulers.rulersElement.remove();
      this.rulers = null;
    }

    if (this.options.configPanel) {
      if (!this.config) {
        this.config = new CreateConfig(
          this.app,
          this.options.toggleConfig,
          this.options.controlConfig
        );
      }

      this.options.controlConfig.forEach((name) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value: number = this.options[name];
        $(`.slider-app__control--${name}`).val(value);
      });

      this.options.toggleConfig.forEach((name) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value: string = this.options[name];
        $(`.slider-app__toggle--${name}`).attr("checked", value);
      });

      if (!this.options.range) {
        $(".slider-app__control--to").prop("disabled", true);
      } else {
        $(".slider-app__control--to").prop("disabled", false);
      }
    } else if (this.config) {
      this.config.configElement.remove();
      this.config = null;
    }
  }
}

export default View;
