import {SliderRangeOptions} from './slider';
import {Controller} from './slider.controller';

class Model {
    public static slider = (data: Partial<SliderRangeOptions>): JQuery => {
        const min = data.min ?? 0;
        const max = data.max ?? 100;
        const value = data.value ?? 50;
        const step = data.step ?? 0.1;
        const horizontal = Controller.setHorizontal(data.horizontal) ?? 'rotate(90deg)';
    return $(`
        <div class="slider-app" style="transform: ${horizontal}">
            <span class="slider-app__rulers"></span>
            <span class="slider-app__bar">
                <span class="slider-app__fill"></span>
            </span>
            <input 
            class="slider-app__input" 
            type="range" 
            min=${min} 
            max=${max} 
            value=${value}
            step=${step}
            >
        </div>
    `);
    };
}

export {Model};