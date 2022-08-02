import ModelOption from '../utils/ModelOption';

import setSlider from './SubViews/setSlider.view';
import setRulers from './SubViews/setRulers.view';
import setRange from './SubViews/setRange.view';
import setBar from './SubViews/setBar.view';
import setTooltip from './SubViews/setTooltip.view';
import setColor from './SubViews/setColor.view';
import setVertical from './SubViews/setVertical.view';
import setConfig from './SubViews/setConfig.view';
import updateConfig from './SubViews/updateConfig.view';
import updateControl from './SubViews/updateControl.view';

class View {
    private readonly selectorState: string;
    private readonly optionsState: Partial<ModelOption>;
    private readonly setSlider: CallableFunction;
    private readonly setRange: CallableFunction;
    private readonly setRulers: CallableFunction;
    private readonly setBar: CallableFunction;
    private readonly setTooltip: CallableFunction;
    private readonly setColor: CallableFunction;
    private readonly setVertical: CallableFunction;
    private readonly setConfig: CallableFunction;
    private readonly updateConfig: CallableFunction;
    private readonly updateControl: CallableFunction;

    constructor(private selector: string, private options: Partial<ModelOption>) {
        this.selectorState = selector;
        this.optionsState = options;
        this.setSlider = setSlider.bind(this);
        this.setRulers = setRulers.bind(this);
        this.setRange = setRange.bind(this);
        this.setBar = setBar.bind(this);
        this.setTooltip = setTooltip.bind(this);
        this.setColor = setColor.bind(this);
        this.setVertical = setVertical.bind(this);
        this.setConfig = setConfig.bind(this);
        this.updateConfig = updateConfig.bind(this);
        this.updateControl = updateControl.bind(this);
    }

    render(): void {
        this.setSlider();
        this.setRange();
        this.setBar();
        this.setRulers();
        this.setColor();
        this.setConfig();
        this.updateConfig();
        this.updateControl();
        this.setTooltip();
        this.setVertical();
    }
}

export default View;