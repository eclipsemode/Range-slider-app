import $ from 'jquery';

function setColor(): void {
    const isColorAdded: string =
        this.optionsState.color.firstColor || this.optionsState.color.secondColor;
    const isTextColorAdded: string = this.optionsState.color.textColor;
    const isThumbColorAdded: string = this.optionsState.color.thumbColor;
    const $values: JQuery = $(`${this.selectorState} .js-slider-app__rulers-values`);

    if (isColorAdded) {
        const colorOne: string = this.optionsState.color.firstColor;
        const colorTwo: string = this.optionsState.color.secondColor;
        const $progress: JQuery = $(`${this.selectorState} .js-slider-app__progress`);

        $progress.css('background-image',
            `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`);
    }

    if (isTextColorAdded) {
        $values.css('color', this.optionsState.color.textColor);
        $(`${this.selectorState} .js-slider-app__config-text--inner`)
            .css('color', this.optionsState.color.textColor);

        $(`${this.selectorState} .js-slider-app__config-toggle-name`)
            .css('color', this.optionsState.color.textColor);

        // noinspection HtmlDeprecatedAttribute
        $(`<style type="text/css">${this.selectorState} .js-slider-app__config-toggle-btn::before
                {background-color: ${this.optionsState.color.textColor}}</style>`)
            .appendTo($('head'));
    }

    if (isThumbColorAdded) {
        // noinspection HtmlDeprecatedAttribute
        $(`<style type="text/css">${this.selectorState} .js-slider-app__input::-webkit-slider-thumb
                {background-color: ${this.optionsState.color.thumbColor}}</style>`)
            .appendTo($('head'));
    }
}

export default setColor;