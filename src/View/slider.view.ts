import ModelOption from '../utils/ModelOption';
import Observer from '../Observer/Observer';
import ObserverTypesEnum from '../Observer/ObserverTypes.enum';
import ChangeEvent = JQuery.ChangeEvent;

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

        this.subscribeObservers();
        this.broadcastObservers();
    }

    subscribeObservers(): void {
        this.subscribe(
            this.setSlider,
            this.setRange,
            this.setBar,
            this.setRulers,
            this.setColor,
            this.setConfig,
            this.updateConfig,
            this.updateControl,
            this.setTooltip,
            this.setVertical
        );
    }

    broadcastObservers(): void {
        const thumbClassName = '.slider-app__input';
        const thumbMinClassName = '.slider-app__input-min';
        const thumbMaxClassName = '.slider-app__input-max';
        
        $(thumbClassName).on('input', (e: ChangeEvent) => {
            if (e.currentTarget.classList.contains('js-slider-app__input-min')) {

                    if (e.currentTarget.value > +this.optionsState.to - +this.optionsState.step) {
                        $(thumbMinClassName).val(+this.optionsState.to - +this.optionsState.step);
                        this.optionsState.from = +$(thumbMinClassName).val();
                    } else {
                        this.optionsState.from = e.currentTarget.value;
                    }

            } else {

                    if (e.currentTarget.value < +this.optionsState.from + +this.optionsState.step) {
                        $(thumbMaxClassName).val(+this.optionsState.from + +this.optionsState.step);
                        this.optionsState.to = +$(thumbMaxClassName).val();
                    } else {
                        this.optionsState.to = e.currentTarget.value;
                    }

            }
            this.broadcast(ObserverTypesEnum.THUMBS);
        });
    }
}

export default View;