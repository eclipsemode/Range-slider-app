import $ from 'jquery';

import { Thumb } from '../../components';
import {ClassName, ModelOption} from '../../utils';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const $thumbsMain: JQuery = $(this.selectorState + ' ' + ClassName.BAR_LINE);
    const opts: ModelOption = this.getOpts();
    const isRangeTrue: boolean = this.optionsState.range;
    const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
    const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

    const checkValueThumbs = (from: number, to: number, max: number, gap: number) => {
        if (to < from + gap) {
            from + gap > max ? opts.from = to - gap : opts.to = from + gap;
        }
    };

    if (isRangeTrue) {
        checkValueThumbs(opts.from, opts.to, opts.max, opts.gap);

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
        $thumbsMain.length !== 0 ? $thumbMax.remove() : null;
        this.setConfig();
    }
}

export default setRange;