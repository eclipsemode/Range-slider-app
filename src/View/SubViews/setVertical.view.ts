import $ from 'jquery';

function setVertical(): void {

    if (this.optionsState.vertical) {

        $(`${ this.selectorState }`).addClass('root--vertical');

        $(`${ this.selectorState } .slider-app`)
            .addClass('slider-app--vertical');

        $(`${ this.selectorState } .js-slider-app__bar-line`)
            .addClass('slider-app__bar-line--vertical');

        $(`${ this.selectorState } .js-slider-app__rulers`)
            .addClass('slider-app__rulers--vertical');

        $(`${ this.selectorState } .js-slider-app__rulers-values`)
            .addClass('slider-app__rulers-values--vertical');

        $(`${ this.selectorState } .slider-app__tooltip-line`)
            .addClass('slider-app__tooltip-line--vertical');

        $(`${ this.selectorState } .slider-app__tooltip`)
            .addClass('slider-app__tooltip--vertical');

    } else {

        $(`${ this.selectorState }`).removeClass('root--vertical');

        $(`${ this.selectorState } .slider-app`)
            .removeClass('slider-app--vertical');

        $(`${ this.selectorState } .js-slider-app__bar-line`)
            .removeClass('slider-app__bar-line--vertical');

        $(`${ this.selectorState } .js-slider-app__rulers`)
            .removeClass('slider-app__rulers--vertical');

        $(`${ this.selectorState } .js-slider-app__rulers-values`)
            .removeClass('slider-app__rulers-values--vertical');

        $(`${ this.selectorState } .slider-app__tooltip-line`)
            .removeClass('slider-app__tooltip-line--vertical');

        $(`${ this.selectorState } .slider-app__tooltip`)
            .removeClass('slider-app__tooltip--vertical');
    }
}

export default setVertical;