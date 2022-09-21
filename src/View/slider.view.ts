import {ModelOption} from '../utils';
import Observer from '../Observer/Observer';
import Observ from '../Observer/Observ';

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

        const myElem = this.observeHtml();


        $('.test').on('click', () => {
            myElem.options = {
                ...this.options,
                min: -10000
            };
            console.log(myElem.options);
        });
    }

    observeHtml() {
        const observable = new Observ(this.optionsState);

        observable.subscribe((option: ModelOption) => {
            $('.js-slider-app__input-min').val(option.from);
            $('.js-slider-app__input-max').val(option.to);
            $('.js-slider-app__input-min').prop('min', option.min);
            $('.js-slider-app__input-max').prop('max', option.max);
        });

        return observable;
    }

}

export default View;