import {ClassName, ModelOption, ControlsEnum, TogglesEnum} from '../utils';
import Observer from '../Observer/Observer';

import {
    setBar,
    setSlider,
    setRulers,
    setRange,
    setTooltip,
    setColor,
    setVertical,
    setControl,
    setConfig
} from './SubViews';
import $ from 'jquery';


class View extends Observer {
    private readonly selectorState: string;
    private readonly optionsState: ModelOption;
    private readonly setSlider: CallableFunction;
    private readonly setRange: CallableFunction;
    private readonly setRulers: CallableFunction;
    private readonly setBar: CallableFunction;
    private readonly setTooltip: CallableFunction;
    private readonly setColor: CallableFunction;
    private readonly setVertical: CallableFunction;
    private readonly setControl: CallableFunction;
    private readonly setConfig: CallableFunction;

    constructor(private selector: string, private options: ModelOption) {
        super();
        this.selectorState = selector;
        this.optionsState = options;
        this.setSlider = setSlider.bind(this);
        this.setRulers = setRulers.bind(this);
        this.setRange = setRange.bind(this);
        this.setBar = setBar.bind(this);
        this.setTooltip = setTooltip.bind(this);
        this.setColor = setColor.bind(this);
        this.setVertical = setVertical.bind(this);
        this.setControl = setControl.bind(this);
        this.setConfig = setConfig.bind(this);
    }

    render(): void {
        this.opts = this.optionsState;
        this.setSlider();
        this.setBar();
        this.setRange();
        this.setRulers();
        this.setColor();
        this.setControl();
        this.setConfig();
        this.setTooltip();
        this.setVertical();
        this.thumbsObserver();
        this.controlObserver();
        this.configObserver();
    }

    thumbsObserver() {
        const ObserveThumbs = this.observeThumbs();
        const $thumbs: JQuery = $('.js-slider-app__input');
        const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

        $thumbs.off();
        $thumbs.on('input', (e: JQuery.ChangeEvent) => {
            if ($(e.currentTarget).hasClass('js-slider-app__input-min')) {
                if (+$thumbMin.val() > +$thumbMax.val() - this.opts.gap && this.opts.range) {
                    +$thumbMax.val() - this.opts.step < +$thumbMax.val() - this.opts.gap
                        ? $thumbMin.val(+$thumbMax.val() - this.opts.step)
                        : $thumbMin.val(+$thumbMax.val() - this.opts.gap);
                }

                ObserveThumbs.opts = {
                    ...this.opts,
                    from: +e.target.value
                };
            } else {
                if (+$thumbMin.val() > +$thumbMax.val() - this.opts.gap) {
                    +$thumbMin.val() + this.opts.step > +$thumbMin.val() + this.opts.gap
                        ? $thumbMax.val(+$thumbMin.val() + this.opts.step)
                        : $thumbMax.val(+$thumbMin.val() + this.opts.gap);
                }

                ObserveThumbs.opts = {
                    ...this.opts,
                    to: +e.target.value
                };
            }
        });
    }

    controlObserver() {
        const ObserveControl = this.observeControl();
        this.opts.controlConfig.forEach((item: string): void => {
            const $element: JQuery = $(`${ this.selectorState }__control-${ item }`);

            $element.off();
            $element.on('change', (e: JQuery.ChangeEvent) => {
                const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
                const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);
                switch (item) {
                    case ControlsEnum.MIN:
                        ObserveControl.opts = {
                            ...this.opts,
                            min: +e.target.value
                        };
                        break;
                    case ControlsEnum.MAX:
                        ObserveControl.opts = {
                            ...this.opts,
                            max: +e.target.value
                        };
                        break;
                    case ControlsEnum.STEP:
                        ObserveControl.opts = {
                            ...this.opts,
                            step: +e.target.value
                        };
                        break;
                    case ControlsEnum.FROM:
                        if (+e.target.value > +$thumbMax.val() - this.opts.gap && this.opts.range) {
                            +$thumbMax.val() - this.opts.step < +$thumbMax.val() - this.opts.gap
                                ? e.target.value = +$thumbMax.val() - this.opts.step
                                : e.target.value = +$thumbMax.val() - this.opts.gap;
                        }

                        ObserveControl.opts = {
                            ...this.opts,
                            from: +e.target.value
                        };
                        break;
                    case ControlsEnum.TO:
                        if (+$thumbMin.val() > +e.target.value - this.opts.gap) {
                            +$thumbMin.val() + this.opts.step > +$thumbMin.val() + this.opts.gap
                                ? e.target.value = +$thumbMin.val() + this.opts.step
                                : e.target.value = +$thumbMin.val() + this.opts.gap;
                        }

                        ObserveControl.opts = {
                            ...this.opts,
                            to: +e.target.value
                        };
                        break;
                }
            });
        });
    }

    configObserver() {
        const ObserveConfig = this.observeConfig();

        this.opts.toggleConfig.forEach((item: string): void => {
            const $element: JQuery = $(`${ this.selectorState }__toggle-${ item }`);

            $element.off();
            $element.on('change', (e: JQuery.ChangeEvent) => {
                switch (item) {
                    case TogglesEnum.VERTICAL:
                        ObserveConfig.opts = {
                            ...this.opts,
                            vertical: e.target.checked
                        };
                        break;
                    case TogglesEnum.RANGE:
                        ObserveConfig.opts = {
                            ...this.opts,
                            range: e.target.checked
                        };
                        break;
                    case TogglesEnum.RULERS:
                        ObserveConfig.opts = {
                            ...this.opts,
                            rulers: e.target.checked
                        };
                        break;
                    case TogglesEnum.PROGRESS:
                        ObserveConfig.opts = {
                            ...this.opts,
                            progress: e.target.checked
                        };
                        break;
                    case TogglesEnum.TOOLTIP:
                        ObserveConfig.opts = {
                            ...this.opts,
                            tooltip: e.target.checked
                        };
                        break;
                }
            });
        });
    }

    observeThumbs() {
        const observable = new Observer(this.opts);
        observable.subscribe(option => {
            $(`${ this.selectorState }__control-from`).val(option.from);
            $(`${ this.selectorState }__control-to`).val(option.to);
            this.opts = option;
            this.setBar();
            this.setTooltip();
        });
        return observable;
    }

    observeControl() {
        const observable = new Observer(this.opts);

        observable.subscribe(option => {
            const $controlTo = $(`${ this.selectorState }__control-to`);
            const $controlFrom = $(`${ this.selectorState }__control-from`);
            const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
            const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

            $thumbMin.val(option.from);
            this.opts.range ? $thumbMax?.val(option.to) : null;
            this.opts = {
                ...option,
                from: +$thumbMin.val(),
                to: this.opts.range ? +$thumbMax?.val() : this.opts.to
            };

            $thumbMin.prop({
                step: this.opts.step,
                min: this.opts.min,
                max: this.opts.max
            });
            this.opts.range ?
                $thumbMax.prop({
                    step: this.opts.step,
                    min: this.opts.min,
                    max: this.opts.max
                }) : null;
            this.opts = {
                ...this.opts,
                from: +$thumbMin.val(),
                to: this.opts.range ? +$thumbMax?.val() : this.opts.to
            };
            $controlFrom.prop({
                step: this.opts.step,
                value: this.opts.from
            });
            $controlTo.prop({
                step: this.opts.step,
                value: this.opts.to
            });

            this.setBar();
            this.setTooltip();
            this.setRulers();
        });
        return observable;
    }

    observeConfig() {
        const observable = new Observer(this.opts);

        observable.subscribe(option => {
            this.opts = {
                ...option
            };
            this.setRange();
            this.setBar();
            this.setControl();
            this.setConfig();
            this.setTooltip();
            this.setRulers();
            this.setColor();
            this.setVertical();
            this.thumbsObserver();
        });

        return observable;
    }
}

export default View;