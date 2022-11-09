import $ from 'jquery';

class Progress {

    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    public getProgress(): JQuery {
        return $('<div>', {
            class: 'slider-app__progress js-slider-app__progress'
        }).prependTo(`${ this.selector } .slider-app__line`);
    }

}

export default Progress;