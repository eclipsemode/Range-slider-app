import $ from 'jquery';

import { Thumb } from '../../components';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const $thumbsMain: JQuery = $(`${ this.selectorState } .js-slider-app__bar-line`);
    const isRangeTrue: boolean = this.optionsState.range;

    const checkValueThumbs = () => {
        if (+this.optionsState.to < +this.optionsState.from + +this.optionsState.gap) {
            if (+this.optionsState.from + +this.optionsState.gap > +this.optionsState.max) {
                this.optionsState.from = +this.optionsState.to - +this.optionsState.gap;
            } else {
                this.optionsState.to = +this.optionsState.from + +this.optionsState.gap;
            }
        }
    };

    if (isRangeTrue) {
        checkValueThumbs();

        $thumbsMain.length !== 0 ? $thumbsMain.remove() : null;
        this.setBar();
        thumb.getMinThumb(
            this.optionsState.min,
            this.optionsState.max,
            this.optionsState.from,
            this.optionsState.step);
        thumb.getMaxThumb(
            this.optionsState.min,
            this.optionsState.max,
            this.optionsState.to,
            this.optionsState.step);

    } else {
        $thumbsMain.length !== 0 ? $thumbsMain.remove() : null;
        this.setBar();
        thumb.getMinThumb(
            this.optionsState.min,
            this.optionsState.max,
            this.optionsState.from,
            this.optionsState.step);
    }
}

export default setRange;