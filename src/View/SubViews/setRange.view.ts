import $ from 'jquery';

import { Thumb } from '../../components';
import {ClassName, ModelOption} from '../../utils';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const $thumbsMain: JQuery = $(this.selectorState + ' ' + ClassName.BAR_LINE);
    const opts: ModelOption = this.getOpts();
    const isRangeTrue: boolean = this.optionsState.range;

    const checkValueThumbs = () => {
        if (+opts.to < +opts.from + +opts.gap) {
            +opts.from + +opts.gap > +opts.max
                ? opts.from = +opts.to - +opts.gap
                : opts.to = +opts.from + +opts.gap;
        }
    };

    if (isRangeTrue) {
        checkValueThumbs();

        $thumbsMain.length !== 0 ? $thumbsMain.remove() : null;
        this.setBar();
        thumb.getMinThumb(
            opts.min,
            opts.max,
            opts.from,
            opts.step);
        thumb.getMaxThumb(
            opts.min,
            opts.max,
            opts.to,
            opts.step);

    } else {
        $thumbsMain.length !== 0 ? $thumbsMain.remove() : null;
        this.setBar();
        thumb.getMinThumb(
            opts.min,
            opts.max,
            opts.from,
            opts.step);
    }
}

export default setRange;