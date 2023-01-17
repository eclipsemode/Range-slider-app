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
  RenderTooltip,
  RenderProgress,
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

  private renderProgress: RenderProgress;

  private tooltipFrom: CreateTooltip;

  private tooltipTo: CreateTooltip;

  private renderTooltip: RenderTooltip;

  private rulers: CreateRulers;

  private config: CreateConfig;

  private renderConfig: RenderConfig;

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

    this.sliderInitial();

    this.configInitial();

    this.tooltipInitial();

    this.progressInitial();

    this.thumbsInitial();

    this.rulersInitial();
  }

  private sliderInitial() {
    this.app.addClass("slider-app");
    if (this.options.vertical) {
      this.app.addClass("slider-app--vertical");
      this.bar.barElement.addClass("slider-app__bar--vertical");
    } else {
      this.app.removeClass("slider-app--vertical");
      this.bar.barElement.removeClass("slider-app__bar--vertical");
    }
  }

  private configInitial() {
    this.renderConfig = new RenderConfig(this.options, this.config, this.app);
    this.config = this.renderConfig.config;
  }

  private tooltipInitial() {
    this.renderTooltip = new RenderTooltip(
      this.options,
      this.tooltipFrom,
      this.tooltipTo,
      this.bar
    );
    this.tooltipFrom = this.renderTooltip.tooltipFrom;
    this.tooltipTo = this.renderTooltip.tooltipTo;
  }

  private progressInitial() {
    this.renderProgress = new RenderProgress(
      this.options,
      this.progress,
      this.bar
    );
    this.progress = this.renderProgress.progress;
  }

  private thumbsInitial() {
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

  private rulersInitial() {
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
