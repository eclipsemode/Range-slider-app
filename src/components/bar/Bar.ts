import $ from 'jquery';

class Bar {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    public getBar(): JQuery {
        return $('<div>', {
            class: 'slider-app__line js-slider-app__line'
        }).appendTo(`${ this.selector } .slider-app`);
    }
}

export default Bar;