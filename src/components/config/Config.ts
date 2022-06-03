import './config.scss';

class Config {
    private readonly selector: string;
    private control: string[] = ['min', 'max', 'step', 'from', 'to'];
    private toggle: string[] = ['vertical', 'range', 'scale', 'bar', 'tooltip'];
    private min: number;
    private step: number;
    private from: number;
    private to: number;
    private readonly range: boolean;

    constructor(
        selector: string,
        min: number,
        max: number,
        step: number,
        from: number,
        to: number,
        range: boolean
    ) {
        this.selector = selector;
        this.min = min;
        this.step = step;
        this.from = from;
        this.to = to;
        this.range = range;
    }
    getConfig() {
        const newSelector: string = this.selector.slice(1);

        $(this.selector).after(
            `<div class="slider-app__config">
                        <div class="slider-app__config-section slider-app__config-section--control"></div>
                        <div class="slider-app__config-section slider-app__config-section--toggle"></div>
                    </div>`
        );

        this.control.forEach(name => {
            $('.slider-app__config-section--control').append(
                `<div class="slider-app__config-container">
                    <div class="slider-app__config-text">
                        <span class="slider-app__config-text--inner">${name}</span>
                    </div>
                    <input 
                    class="slider-app__config-input slider-app__config-input---min" 
                    type="number" 
                    id=${newSelector + '__control-' + name} 
                    />
                </div>`
            );
        });

        this.toggle.forEach(name => {
            $('.slider-app__config-section--toggle').append(
                `<div class="slider-app__config-toggle-container">
                    <label 
                    class="slider-app__config-toggle-name" 
                    for=${newSelector + '__toggle-' + name}>
                        ${name}
                    </label>
                    <label class="slider-app__config-toggle">
                        <input 
                        class="slider-app__config-toggle-box" 
                        type="checkbox" id=${newSelector + '__toggle-' + name}>
                        <span class="slider-app__config-toggle-btn"></span>
                    </label>
                </div>`
            );
        });

        this.rangeDisabled(this.range, `#${newSelector}__control-to`);
    }

    rangeDisabled(range: boolean, element: string) {
        if (!range) {
            $(element).prop('disabled', true);
        } else {
            $(element).prop('disabled', false);
        }
    }
}

export default Config;