import $ from "jquery";
import { ModelOption } from "../utils";

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
// } from "./SubViews";
// import { observeThumbs, observeControl, observeConfig } from "../Observer";

class View {
  private readonly app: JQuery;

  private options: Partial<ModelOption>;

  private readonly span: JQuery;

  constructor(private readonly selector: string) {
    this.app = $(selector);
    this.span = $("<pre>");

    this.app.append(this.span);
  }

  public bindChangeOptions(handler: CallableFunction) {
    this.span.on("click", () => {
      this.options = {
        ...this.options,
        rulers: !this.options.rulers,
      };
      handler(this.options);
    });
  }

  public render(options: ModelOption) {
    this.options = options;
    this.span.text(JSON.stringify(options, null, 2));
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
