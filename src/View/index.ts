import $ from "jquery";

import { ModelOption, convertToNumber, convertToPixel } from "../utils";

import {
  CreateBar,
  CreateThumbFrom,
  CreateThumbTo,
  CreateProgress,
  CreateTooltip,
  CreateRulers,
  CreateConfig,
  RenderConfig,
} from "./subViews";

import ObserveThumbsMove from "./observable/ObserveThumbsMove";
import ObserveBarClick from "./observable/ObserveBarClick";
import ObserveRulersClick from "./observable/ObserveRulersClick";
import ObserveConfig from "./observable/ObserveConfig";

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

  private configInit: RenderConfig;

  private options: ModelOption;

  private observeThumbsMove: ObserveThumbsMove;

  private observeBarClick: ObserveBarClick;

  private observeRulersClick: ObserveRulersClick;

  private observeConfig: ObserveConfig;

  constructor(private readonly selector: string) {
    this.app = $(selector);
    this.bar = new CreateBar(this.app);
  }

  public bindChangeOptions(handler: CallableFunction) {
    this.app.on("mousedown", (e: JQuery.MouseDownEvent) => {
      /**
       * Binds thumbs move.
       */
      this.observeThumbsMove = new ObserveThumbsMove(
        this.app,
        this.options,
        this.bar,
        this.fromThumb,
        this.toThumb,
        handler,
        e
      );

      /**
       * Binds rulers values.
       */

      this.observeRulersClick = new ObserveRulersClick(
        this.options,
        handler,
        e
      );
    });

    this.bar?.barElement.on("mousedown", (e: JQuery.MouseDownEvent) => {
      /**
       * Binds click on bar.
       */
      this.observeBarClick = new ObserveBarClick(
        this.options,
        this.bar,
        handler,
        e
      );
    });

    this.app.on("input", (e: JQuery.TriggeredEvent) => {
      /**
       * Binds config.
       */
      this.observeConfig = new ObserveConfig(this.options, handler, e);
    });

    /**
     * Binds resize window.
     */

    $(window).on("resize", () => handler(this.options));
  }

  public render(options: ModelOption) {
    this.options = options;

    this.renderInitial();

    this.renderConfig();

    this.renderTooltip();

    this.renderProgress();

    this.renderThumbs();

    this.renderRulers();
  }

  private renderInitial() {
    this.app.addClass("slider-app");
    if (this.options.vertical) {
      this.app.addClass("slider-app--vertical");
      this.bar.barElement.addClass("slider-app__bar--vertical");
    } else {
      this.app.removeClass("slider-app--vertical");
      this.bar.barElement.removeClass("slider-app__bar--vertical");
    }
  }

  private renderConfig() {
    this.configInit = new RenderConfig(this.options, this.config, this.app);
    this.config = this.configInit.config;
  }

  private renderTooltip() {
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

      this.tooltipFrom.tooltipElement.css({
        left: this.options.vertical ? "auto" : `${offsetFromThumb}px`,
        bottom: this.options.vertical ? `${offsetFromThumb}px` : "2.2em",
      });
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
          this.options.vertical ? sliderHeight : sliderWidth,
          this.options.min,
          this.options.max
        );

        this.tooltipTo.tooltipElement.css({
          left: this.options.vertical ? "auto" : `${offsetToThumb}px`,
          bottom: this.options.vertical ? `${offsetToThumb}px` : "2.2em",
        });
        this.tooltipTo.tooltipElement.text(this.options.to);

        const tooltipFromWidth: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("width")
        );
        const tooltipFromHeight: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("height")
        );
        const tooltipToWidth: number = parseFloat(
          this.tooltipTo.tooltipElement.css("width")
        );
        const tooltipToHeight: number = parseFloat(
          this.tooltipTo.tooltipElement.css("height")
        );

        const tooltipFromLeft: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("left")
        );
        const tooltipFromBottom: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("bottom")
        );

        const tooltipToLeft: number = parseFloat(
          this.tooltipTo.tooltipElement.css("left")
        );
        const tooltipToBottom: number = parseFloat(
          this.tooltipTo.tooltipElement.css("bottom")
        );

        if (this.options.vertical) {
          if (
            tooltipToBottom - tooltipFromBottom <=
            Math.max(tooltipFromHeight, tooltipToHeight)
          ) {
            this.tooltipTo.tooltipElement.remove();
            this.tooltipTo = null;
            this.tooltipFrom.tooltipElement.addClass(
              "slider-app__tooltip--merged"
            );

            const newBottomCss: number =
              (tooltipToBottom - tooltipFromBottom) / 2;

            this.tooltipFrom.tooltipElement.text(
              `${this.options.from} - ${this.options.to}`
            );

            this.tooltipFrom.tooltipElement.css({
              bottom: `${tooltipFromBottom + newBottomCss}px`,
            });
          } else {
            this.tooltipFrom.tooltipElement.removeClass(
              "slider-app__tooltip--merged"
            );
          }
        } else if (
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
  }

  private renderProgress() {
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
  }

  private renderThumbs() {
    if (this.options.range) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();
      if (!this.toThumb) {
        this.toThumb = new CreateThumbTo(this.bar.barElement);
      }

      if (!this.fromThumb) {
        this.fromThumb = new CreateThumbFrom(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.fromThumb.fromThumbElement.addClass("slider-app__thumb--vertical");
        this.toThumb.toThumbElement.addClass("slider-app__thumb--vertical");
      } else {
        this.toThumb.toThumbElement.removeClass("slider-app__thumb--vertical");
        this.fromThumb.fromThumbElement.removeClass(
          "slider-app__thumb--vertical"
        );
      }

      this.fromThumb.fromThumbElement.css({
        bottom: this.options.vertical
          ? `${convertToPixel(
              this.options.from,
              sliderHeight,
              this.options.min,
              this.options.max
            )}px`
          : "auto",
        left: this.options.vertical
          ? "-0.85em"
          : `${convertToPixel(
              this.options.from,
              sliderWidth,
              this.options.min,
              this.options.max
            )}px`,
      });

      this.toThumb.toThumbElement.css({
        bottom: this.options.vertical
          ? `${convertToPixel(
              this.options.to,
              sliderHeight,
              this.options.min,
              this.options.max
            )}px`
          : "auto",
        left: this.options.vertical
          ? "-0.85em"
          : `${convertToPixel(
              this.options.to,
              sliderWidth,
              this.options.min,
              this.options.max
            )}px`,
      });

      if (this.options.progress) {
        this.progress.progressElement.css({
          left: this.options.vertical
            ? "auto"
            : `${convertToPixel(
                this.options.from,
                sliderWidth,
                this.options.min,
                this.options.max
              )}px`,
          bottom: this.options.vertical
            ? `${convertToPixel(
                this.options.from,
                sliderHeight,
                this.options.min,
                this.options.max
              )}px`
            : "auto",
          width: this.options.vertical
            ? "100%"
            : `${
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
              }px`,
          height: this.options.vertical
            ? `${
                convertToPixel(
                  this.options.to,
                  sliderHeight,
                  this.options.min,
                  this.options.max
                ) -
                convertToPixel(
                  this.options.from,
                  sliderHeight,
                  this.options.min,
                  this.options.max
                )
              }px`
            : "100%",
        });
      }
    } else {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();

      if (!this.fromThumb) {
        this.fromThumb = new CreateThumbFrom(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.fromThumb.fromThumbElement.addClass("slider-app__thumb--vertical");
      } else {
        this.fromThumb.fromThumbElement.removeClass(
          "slider-app__thumb--vertical"
        );
      }

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
          left: "-0.85em",
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
            bottom: "0",
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
  }

  private renderRulers() {
    if (this.options.rulers) {
      if (this.rulers) {
        this.rulers.rulersElement?.remove();
        this.rulers = null;
      }

      if (!this.rulers) {
        const sliderWidth: number = this.bar.barElement.innerWidth();
        const sliderHeight: number = this.bar.barElement.innerHeight();
        const convertedStepToPixel: number = convertToPixel(
          this.options.step,
          this.options.vertical ? sliderHeight : sliderWidth,
          this.options.min,
          this.options.max
        );

        let gap = 87;

        if (convertedStepToPixel > gap) {
          gap = convertedStepToPixel;
        } else {
          gap = gap - (gap % convertedStepToPixel) + convertedStepToPixel;
        }
        const amountValues: number = this.options.vertical
          ? sliderHeight / gap
          : sliderWidth / gap;
        const gapValues: number = this.options.vertical
          ? sliderHeight / amountValues
          : sliderWidth / amountValues;
        const valuesArr: number[] = [];
        const pixelsArr: number[] = [];

        if (this.options.vertical) {
          for (let i = 0; i < sliderHeight - gapValues; i += gapValues) {
            valuesArr.push(
              convertToNumber(
                i,
                sliderHeight,
                this.options.min,
                this.options.max
              )
            );
            pixelsArr.push(i);
          }
        } else {
          for (let i = 0; i < sliderWidth - gapValues; i += gapValues) {
            valuesArr.push(
              convertToNumber(
                i,
                sliderWidth,
                this.options.min,
                this.options.max
              )
            );
            pixelsArr.push(i);
          }
        }

        pixelsArr.push(this.options.vertical ? sliderHeight : sliderWidth);
        valuesArr.push(this.options.max);

        this.rulers = new CreateRulers(
          this.bar.barElement,
          valuesArr,
          pixelsArr,
          this.options.vertical
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
  }
}

export default View;
