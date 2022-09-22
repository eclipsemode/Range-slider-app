import { ClassName, ModelOption } from '../utils';
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

        this.thumbsUpdate();
    }

    thumbsUpdate() {
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

    observeThumbs() {
        const observable = new Observer(this.opts);

        observable.subscribe((option: ModelOption) => {
            $('#slider__control-from').val(option.from);
            $('#slider__control-to').val(option.to);
            this.opts = option;
            this.setBar();
            this.setTooltip();
        });

        return observable;
    }

}

export default View;