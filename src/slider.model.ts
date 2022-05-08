import {SliderRangeOptions} from './slider';

class Model {
    public static slider = (data: Partial<SliderRangeOptions>): JQuery => {
        const min: number = data.min ?? 0;
        const max: number = data.max ?? 100;
        const value: number = data.value ?? 50;
        const step: number = data.step ?? 0.1;
        const width: string = data.width ? data.width + 'px' : '500px';
        const rulers: string = data.rulersHidden === true ? 'none' : 'block';
        const minMaxBlock: string = data.width ? data.width + 70 + 'px' : '570px';

        return $(`
            <div class="slider-app" style="height: ${width}">
                <span class="slider-app__rulers" style="display: ${rulers}"></span>
                <span class="slider-app__bar">
                    <span class="slider-app__fill">
                    <span class="slider-app__fill-stripe" style="height: 100%"></span>
                </span>
                    <div class="slider-app__tooltip">${value}</div>
                </span>
                
                <input 
                class="slider-app__input" 
                type="range" 
                min=${min} 
                max=${max} 
                value=${value}
                step=${step}
                style="width: ${width}"
                >
                <div class="slider-app__value-block" style="height: ${minMaxBlock}">
                    <span class="slider-app__min-value">${min}</span>
                    <span class="slider-app__max-value">${max}</span>
                </div>
            </div>
        `);
    };
}

export {Model};