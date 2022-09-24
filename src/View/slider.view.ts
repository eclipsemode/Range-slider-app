import { ClassName, ModelOption, ControlsEnum } from '../utils';
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
    setConfig,
    updateConfig,
    updateControl
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
    private readonly updateConfig: CallableFunction;
    private readonly updateControl: CallableFunction;

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
        this.updateConfig = updateConfig.bind(this);
        this.updateControl = updateControl.bind(this);
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
        this.updateConfig();
        this.updateControl();
        this.setTooltip();
        this.setVertical();
        this.thumbsObserver();
        this.controlObserver();
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
        this.opts.controlConfig.forEach((item: string) => {
            const $element: JQuery = $(`#${ this.selectorState.slice(1) }__control-${ item }`);

            $element.off();
            $element.on('input', (e: JQuery.ChangeEvent) => {
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
                        ObserveControl.opts = {
                            ...this.opts,
                            from: +e.target.value
                        };
                        break;
                    case ControlsEnum.TO:
                        ObserveControl.opts = {
                            ...this.opts,
                            to: +e.target.value
                        };
                        break;
                }
            });
        });
    }

    observeThumbs() {
        const observable = new Observer(this.opts);
        observable.subscribe(option => {
            $('#slider__control-from').val(option.from);
            $('#slider__control-to').val(option.to);
            this.opts = option;
            this.setBar();
            this.setTooltip();
        });
        return observable;
    }

    observeControl() {
        const observable = new Observer(this.opts);
        const $controlTo = $(`#${ this.selectorState.slice(1) }__control-to`);
        const $controlFrom = $(`#${ this.selectorState.slice(1) }__control-from`);
        const $controlMin = $(`#${ this.selectorState.slice(1) }__control-min`);
        const $controlMax = $(`#${ this.selectorState.slice(1) }__control-max`);
        const $controlStep = $(`#${ this.selectorState.slice(1) }__control-step`);
        const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

        observable.subscribe(option => {
            $thumbMin.val(option.from);
            $thumbMax.val(option.to);
            this.opts = {
                ...option,
                from: +$(ClassName.MIN).val(),
                to: +$(ClassName.MAX).val()
            };
            $thumbMin.prop({
                step: this.opts.step
            });
            $thumbMax.prop({
                step: this.opts.step
            });
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
}

export default View;