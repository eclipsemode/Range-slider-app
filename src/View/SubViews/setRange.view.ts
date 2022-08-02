import $ from 'jquery';

import Thumb from '../../components/thumb/Thumb';

function setRange ():void {
    const thumb: Thumb = new Thumb(
        this.selectorState,
        this.optionsState.min,
        this.optionsState.max,
        this.optionsState.from,
        this.optionsState.to,
        this.optionsState.step);
    const $inputMax: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);
    const $inputMin: JQuery = $(`${this.selectorState} .js-slider-app__input-min`);
    const $thumbsMain: JQuery = $(`${this.selectorState} .js-slider-app__bar-line`);

    const isRangeTrue: boolean = this.optionsState.range;
    if (isRangeTrue) {
        this.setBar();
        $inputMin.length === 0 ? thumb.getMinThumb() : null;
        $inputMax.length === 0 ? thumb.getMaxThumb() : null;
    } else {
        $thumbsMain.length !== 0 ? $thumbsMain.remove() : null;
        this.setBar();
        thumb.getMinThumb();
    }


    this.setBar();
    this.setRulers();
    this.setConfig();
    $(`${this.selectorState} .js-slider-app__input`).on('input', () => this.setBar());
    this.setTooltip();
    this.updateControl();
    this.setVertical();

}

export default setRange;