import { ModelOption, TogglesEnum, ControlsEnum } from '../utils';
import Observer from '../Observer/Observer';

class Model extends Observer{
    optionsState: Partial<ModelOption>;
    constructor(private options?: Partial<ModelOption>) {
        super();
        this.optionsState = this.checkOptions(options);
    }

    // subscribeOptions(options: ModelOption) {
    //     this.subscribeOpts(this.checkOptions(options));
    // }

    // updateOptionsState(options: ModelOption): void {
    //     this.updateOpts(this.checkOptions(options));
    //     this.optionsState = this.checkOptions(options);
    // }

    checkOptions(options: ModelOption): ModelOption {
        const verifiedOptions = {...options};
        verifiedOptions.min = verifiedOptions.min ?? 0;
        verifiedOptions.max = verifiedOptions.max ?? 1000;
        verifiedOptions.from = verifiedOptions.from ?? verifiedOptions.min;
        verifiedOptions.to = verifiedOptions.to ?? verifiedOptions.max;
        verifiedOptions.gap = verifiedOptions.gap ?? ((verifiedOptions.max - verifiedOptions.min) * 10) / 100;
        verifiedOptions.step = verifiedOptions.step ?? 0.1;
        verifiedOptions.vertical = verifiedOptions.vertical ?? false;
        verifiedOptions.rulers = verifiedOptions.rulers ?? true;
        verifiedOptions.tooltip = verifiedOptions.tooltip ?? false;
        verifiedOptions.percent = verifiedOptions.percent ?? false;
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
        verifiedOptions.configPanel = verifiedOptions.configPanel ?? false;
        verifiedOptions.progress = verifiedOptions.progress ?? true;
        verifiedOptions.controlConfig = Object.values(ControlsEnum);
        verifiedOptions.toggleConfig = Object.values(TogglesEnum);

        verifiedOptions.min =
            verifiedOptions.min < verifiedOptions.max ? verifiedOptions.min :
                verifiedOptions.max;

        verifiedOptions.from =
            (verifiedOptions.from > verifiedOptions.min) &&
            (verifiedOptions.from < verifiedOptions.max) ?
                verifiedOptions.from :
                verifiedOptions.min;

        return verifiedOptions;
    }


}

export default Model;