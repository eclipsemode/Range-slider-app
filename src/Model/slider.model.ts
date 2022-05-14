import ModelOption from '../utils/ModelOption';
import ObserverEvents from '../Observer/ObserverEvents';
import Observer from '../Observer/Observer';

class Model extends Observer {
    optionsState: Partial<ModelOption>;
    constructor(private options?: Partial<ModelOption>) {
        super();
        this.optionsState = this.checkOptions(options);
    }

    // updateOptions(newOptions: Partial<ModelOption>): void {
    //     this.optionsState = this.checkOptions(newOptions);
    //     this.notify(ObserverEvents.optionsUpdate, this.optionsState);
    // }

    checkOptions(options: Partial<ModelOption>): Partial<ModelOption> {
        const verifiedOptions = {...options};

        verifiedOptions.value = verifiedOptions.value ?? 500;
        verifiedOptions.min = verifiedOptions.min ?? 0;
        verifiedOptions.max = verifiedOptions.max ?? 1000;
        verifiedOptions.step = verifiedOptions.step ?? 0.1;
        verifiedOptions.horizontal = verifiedOptions.horizontal ?? true;
        verifiedOptions.rulersHidden = verifiedOptions.rulersHidden ?? false;
        verifiedOptions.tooltip = verifiedOptions.tooltip ?? {display: false, percent: false};
        verifiedOptions.tooltip.percent = verifiedOptions.tooltip.percent ?? false;
        verifiedOptions.tooltip.display = verifiedOptions.tooltip.display ?? false;
        verifiedOptions.color = verifiedOptions.color ?? {
            firstColor: '#ffe53b',
            secondColor: '#ff2525',
            textColor: '#ffe53b',
            thumbColor: '#ffe53b'
        };
        verifiedOptions.color.firstColor = verifiedOptions.color.firstColor ?? '#ffe53b';
        verifiedOptions.color.secondColor = verifiedOptions.color.secondColor ?? '#ff2525';
        verifiedOptions.color.textColor = verifiedOptions.color.textColor ?? '#ffe53b';
        verifiedOptions.color.thumbColor = verifiedOptions.color.thumbColor ?? '#ffe53b';

        verifiedOptions.min =
            verifiedOptions.min < verifiedOptions.max ? verifiedOptions.min :
                verifiedOptions.max;

        verifiedOptions.value =
            (verifiedOptions.value > verifiedOptions.min) &&
            (verifiedOptions.value < verifiedOptions.max) ?
                verifiedOptions.value :
                verifiedOptions.min;

        return verifiedOptions;
    }
}

export default Model;