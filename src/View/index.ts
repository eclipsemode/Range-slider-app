import $ from "jquery";

import { ModelOption } from "../utils";

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
  RenderThumbs,
  RenderRulers,
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

  private renderThumbs: RenderThumbs;

  private progress: CreateProgress;

  private renderProgress: RenderProgress;

  private tooltipFrom: CreateTooltip;

  private tooltipTo: CreateTooltip;

  private renderTooltip: RenderTooltip;

  private rulers: CreateRulers;

  private renderRulers: RenderRulers;

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
    this.renderThumbs = new RenderThumbs(
      this.options,
      this.fromThumb,
      this.toThumb,
      this.bar,
      this.progress
    );
    this.fromThumb = this.renderThumbs.fromThumb;
    this.toThumb = this.renderThumbs.toThumb;
  }

  private rulersInitial() {
    this.renderRulers = new RenderRulers(this.options, this.rulers, this.bar);
    this.rulers = this.renderRulers.rulers;
  }
}

export default View;
