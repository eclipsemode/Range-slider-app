import $ from 'jquery';

class ConfigPanel {
    private readonly selector: string;
    private readonly controlConfig: string[];
    private readonly toggleConfig: string[];

    constructor(
        selector: string,
        controlConfig: string[],
        toggleConfig: string[]
    ) {
        this.selector = selector;
        this.controlConfig = controlConfig;
        this.toggleConfig = toggleConfig;
    }

    getConfig(): void {
        this.getMain();
        this.getControls();
        this.getToggles();
    }

    getMain = (): void => {
        $(this.selector).append(
            `<div class="slider-app__config js-slider-app__config">
                <div class="slider-app__config-section slider-app__config-section--control"></div>
                <div class="slider-app__config-section slider-app__config-section--toggle"></div>
             </div>`
        );
    };

    getControls = (): void => {
        const newSelector: string = this.selector.slice(1);

        this.controlConfig.forEach(name => {
            const selector: string = newSelector + '__control-' + name;

            $('.slider-app__config-section--control').append(
                `<div class="slider-app__config-container">
                    <div class="slider-app__config-text">
                        <span class="slider-app__config-text--inner js-slider-app__config-text--inner">
                            ${name}
                        </span>
                    </div>
                    <input 
                    class='slider-app__config-input'
                    type="number" 
                    id=${selector} 
                    />
                </div>`
            );
        });
    };

    getToggles = (): void => {
        const newSelector: string = this.selector.slice(1);

        this.toggleConfig.forEach(name => {
            const selector: string = newSelector + '__toggle-' + name;

            $('.slider-app__config-section--toggle').append(
                `<div class="slider-app__config-toggle-container">
                    <label 
                    class="slider-app__config-toggle-name js-slider-app__config-toggle-name" 
                    for=${selector}>
                        ${name}
                    </label>
                    <label class="slider-app__config-toggle">
                        <input 
                        class="slider-app__config-toggle-box" 
                        type="checkbox" id=${selector}>
                        <span class="slider-app__config-toggle-btn js-slider-app__config-toggle-btn"></span>
                    </label>
                </div>`
            );
        });
    };
}

export default ConfigPanel;