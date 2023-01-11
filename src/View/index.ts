import $ from "jquery";
import {
  ModelOption,
  convertToNumber,
  convertToPixel,
  calcMouseOffset,
  ControlsEnum,
  ActionEnum,
  TogglesEnum,
} from "../utils";

import CreateBar from "./subViews/CreateBar";
import CreateThumbFrom from "./subViews/CreateThumbFrom";
import CreateThumbTo from "./subViews/CreateThumbTo";
import CreateProgress from "./subViews/CreateProgress";
import CreateTooltip from "./subViews/CreateTooltip";
import CreateRulers from "./subViews/CreateRulers";
import CreateConfig from "./subViews/CreateConfig";

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
      const sliderHeight: number = this.bar.barElement.innerHeight();
      const sliderLeftOffset: number = this.bar.barElement.offset().left;
      const sliderBottomOffset: number = this.bar.barElement.offset().top;

      if (
        e.target.classList.contains(
          this.fromThumb.fromThumbElement[0].classList[1]
        )
      ) {
        $(e.target).on("dragstart", () => false);

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const moveAt = (
          event: JQuery.MouseMoveEvent | JQuery.MouseDownEvent
        ) => {
          const mouseOffsetX: number = event.pageX - sliderLeftOffset;
          const mouseOffsetY: number = -(
            event.pageY -
            sliderBottomOffset -
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

          this.options.from = convertedValueX;

          if (!this.options.vertical) {
            this.options.from = convertedValueX;
          } else {
            this.options.from = convertedValueY;
          }

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

    this.bar?.barElement.on("mousedown", (e) => {
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
          handler(this.options, ActionEnum.DRAG_FROM);
        } else {
          this.options.to = convertedValue;
          handler(this.options, ActionEnum.DRAG_TO);
        }
      } else {
        this.options.from = convertedValue;
        handler(this.options, ActionEnum.DRAG_FROM);
      }
    });

    /**
     * Binds rulers values.
     */

    $(this.app).on("mousedown", (e) => {
      if (e.target.classList.contains("slider-app__rulers-value")) {
        if (this.options.range) {
          if (
            Math.abs(+e.target.textContent - this.options.from) <
            Math.abs(+e.target.textContent - this.options.to)
          ) {
            this.options.from = +e.target.textContent;
            handler(this.options, ActionEnum.DRAG_FROM);
          } else {
            this.options.to = +e.target.textContent;
            handler(this.options, ActionEnum.DRAG_TO);
          }
        } else {
          this.options.from = +e.target.textContent;
          handler(this.options, ActionEnum.DRAG_FROM);
        }
      }
    });

    /**
     * Binds toggles.
     */

    this.app.on("input", (e) => {
      this.options.toggleConfig.forEach((name) => {
        if (e.target.classList.contains(`slider-app__toggle--${name}`)) {
          if (name === TogglesEnum.RANGE) {
            this.options.range = $(`.slider-app__toggle--${name}`).prop(
              "checked"
            );
            handler(this.options, ActionEnum.CONFIG_RANGE);
            return;
          }
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
            this.options.from = +element.val();
            handler(this.options, ActionEnum.DRAG_FROM);
            return;
          }
          if (name === ControlsEnum.TO) {
            this.options.to = +element.val();
            handler(this.options, ActionEnum.DRAG_TO);
            return;
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.options[name] = +element.val();
        }
      });
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
     * Initial CSS.
     */

    this.app.addClass("slider-app");
    if (this.options.vertical) {
      this.app.addClass("slider-app--vertical");
      this.bar.barElement.addClass("slider-app__bar--vertical");
    } else {
      this.app.removeClass("slider-app--vertical");
      this.bar.barElement.removeClass("slider-app__bar--vertical");
    }

    /**
     * Creates Tooltip.
     */
    if (this.options.tooltip) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();

      if (!this.tooltipFrom) {
        this.tooltipFrom = new CreateTooltip(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.tooltipFrom.tooltipElement.addClass(
          "slider-app__tooltip--vertical"
        );
      } else if (this.tooltipFrom) {
        this.tooltipFrom.tooltipElement.removeClass(
          "slider-app__tooltip--vertical"
        );
      }

      const offsetFromThumb: number = convertToPixel(
        this.options.from,
        this.options.vertical ? sliderHeight : sliderWidth,
        this.options.min,
        this.options.max
      );

      this.bar.barElement.css(
        "margin-top",
        this.options.vertical ? "auto" : "2em"
      );
      this.tooltipFrom.tooltipElement.css({
        left: this.options.vertical ? "auto" : `${offsetFromThumb}px`,
        bottom: this.options.vertical ? `${offsetFromThumb - 9}px` : "2.2em",
      });
      // this.tooltipFrom.tooltipElement.css("left", `${offsetFromThumb}px`);
      this.tooltipFrom.tooltipElement.text(this.options.from);

      if (this.options.range) {
        if (!this.tooltipTo) {
          this.tooltipTo = new CreateTooltip(this.bar.barElement);
        }

        if (this.options.vertical) {
          this.tooltipTo.tooltipElement.addClass(
            "slider-app__tooltip--vertical"
          );
        } else {
          this.tooltipTo.tooltipElement.removeClass(
            "slider-app__tooltip--vertical"
          );
        }
        const offsetToThumb: number = convertToPixel(
          this.options.to,
          sliderWidth,
          this.options.min,
          this.options.max
        );

        this.tooltipTo.tooltipElement.css("left", `${offsetToThumb}px`);
        this.tooltipTo.tooltipElement.text(this.options.to);

        const tooltipFromWidth: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("width")
        );
        const tooltipToWidth: number = parseFloat(
          this.tooltipTo.tooltipElement.css("width")
        );

        const tooltipFromLeft: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("left")
        );

        const tooltipToLeft: number = parseFloat(
          this.tooltipTo.tooltipElement.css("left")
        );

        if (
          tooltipToLeft - tooltipFromLeft <=
          Math.max(tooltipFromWidth, tooltipToWidth)
        ) {
          this.tooltipTo.tooltipElement.remove();
          this.tooltipTo = null;
          this.tooltipFrom.tooltipElement.addClass(
            "slider-app__tooltip--merged"
          );

          const newLeftCss: number = (tooltipToLeft - tooltipFromLeft) / 2;

          this.tooltipFrom.tooltipElement.text(
            `${this.options.from} - ${this.options.to}`
          );

          this.tooltipFrom.tooltipElement.css({
            left: `${tooltipFromLeft + newLeftCss}px`,
          });
        } else {
          this.tooltipFrom.tooltipElement.removeClass(
            "slider-app__tooltip--merged"
          );
        }
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
    }

    /**
     * Creates Progress.
     */
    if (this.options.progress) {
      if (!this.progress) {
        this.progress = new CreateProgress(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.progress.progressElement.addClass(
          "slider-app__progress--vertical"
        );
      } else if (this.progress) {
        this.progress.progressElement.removeClass(
          "slider-app__progress--vertical"
        );
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

    if (this.options.vertical) {
      this.fromThumb.fromThumbElement.addClass("slider-app__thumb--vertical");
    } else {
      this.fromThumb.fromThumbElement.removeClass(
        "slider-app__thumb--vertical"
      );
    }

    if (this.options.range) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();
      if (!this.toThumb) {
        this.toThumb = new CreateThumbTo(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.toThumb.toThumbElement.addClass("slider-app__thumb--vertical");
      } else {
        this.toThumb.toThumbElement.removeClass("slider-app__thumb--vertical");
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
      const sliderHeight: number = this.bar.barElement.innerHeight();

      if (this.toThumb) {
        this.toThumb.toThumbElement.remove();
        this.toThumb = null;
      }

      if (!this.options.vertical) {
        this.fromThumb.fromThumbElement.css({
          bottom: "auto",
          left: `${convertToPixel(
            this.options.from,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`,
        });

        if (this.progress?.progressElement) {
          this.progress.progressElement.css({
            height: "100%",
            width: `${convertToPixel(
              this.options.from,
              sliderWidth,
              this.options.min,
              this.options.max
            )}px`,
          });
        }
      } else {
        this.fromThumb.fromThumbElement.css({
          left: "-0.8em",
          bottom: `${convertToPixel(
            this.options.from,
            sliderHeight,
            this.options.min,
            this.options.max
          )}px`,
        });

        if (this.progress?.progressElement) {
          this.progress.progressElement.css({
            width: "100%",
            height: `${convertToPixel(
              this.options.from,
              sliderHeight,
              this.options.min,
              this.options.max
            )}px`,
          });
        }
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
        const convertedStepToPixel: number = convertToPixel(
          this.options.step,
          sliderWidth,
          this.options.min,
          this.options.max
        );

        let gap = 87;

        if (convertedStepToPixel > gap) {
          gap = convertedStepToPixel;
        } else {
          gap = gap - (gap % convertedStepToPixel) + convertedStepToPixel;
        }
        const amountValues: number = sliderWidth / gap;
        const gapValues: number = sliderWidth / amountValues;
        const valuesArr: number[] = [];
        const pixelsArr: number[] = [];

        for (let i = 0; i < sliderWidth - gapValues; i += gapValues) {
          valuesArr.push(
            convertToNumber(i, sliderWidth, this.options.min, this.options.max)
          );
          pixelsArr.push(i);
        }

        pixelsArr.push(sliderWidth);
        valuesArr.push(this.options.max);

        this.rulers = new CreateRulers(
          this.bar.barElement,
          valuesArr,
          pixelsArr
        );

        if (this.options.vertical) {
          this.rulers.rulersElement.addClass("slider-app__rulers--vertical");
          this.rulers.rulersElement
            .children()
            .addClass("slider-app__rulers-value--vertical");
        } else if (this.rulers) {
          this.rulers.rulersElement.removeClass("slider-app__rulers--vertical");
          this.rulers.rulersElement
            .children()
            .removeClass("slider-app__rulers-value--vertical");
        }
      }
    } else if (this.rulers) {
      this.rulers.rulersElement.remove();
      this.rulers = null;
    }

    /**
     * Config panel.
     */

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

      $(".slider-app__control--from").prop({
        step: this.options.step,
      });
      $(".slider-app__control--to").prop({
        step: this.options.step,
      });
      // $(".slider-app__control--to").prop("step", this.options.step);

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
