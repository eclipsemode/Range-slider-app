import ModelOption from '../utils/ModelOption';
import Observer from '../Observer/Observer';

class Model extends Observer {
    optionsState: Partial<ModelOption>;
    constructor(private options?: Partial<ModelOption>) {
        super();
        this.optionsState = this.checkOptions(options);
    }

    checkOptions(options: Partial<ModelOption>): Partial<ModelOption> {
        const verifiedOptions = {...options};
        verifiedOptions.min = verifiedOptions.min ?? 0;
        verifiedOptions.max = verifiedOptions.max ?? 1000;
        verifiedOptions.value = verifiedOptions.value ?? verifiedOptions.min;
        verifiedOptions.valueSecond = verifiedOptions.valueSecond ?? verifiedOptions.max;
        verifiedOptions.gap = verifiedOptions.gap ?? 130;
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
        verifiedOptions.range = verifiedOptions.range ?? false;
        verifiedOptions.config = verifiedOptions.config ?? false;

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