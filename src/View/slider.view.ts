import { ModelOption } from '../utils';
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
    private readonly optionsState: Partial<ModelOption>;
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

    constructor(private selector: string, private options: Partial<ModelOption>) {
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
        this.subscribeOpts(this.optionsState);
        this.setSlider();
        this.setRange();
        this.setBar();
        this.setRulers();
        this.setColor();
        this.setControl();
        this.setConfig();
        this.updateConfig();
        this.updateControl();
        this.setTooltip();
        this.setVertical();

        this.subscribeObservers();
    }

    subscribeObservers(): void {
        this.subscribe(
            this.setBar,
            this.setRulers,
            this.setColor,
            this.setControl,
            this.setConfig,
            this.setTooltip,
            this.setVertical
        );
    }
}

export default View;