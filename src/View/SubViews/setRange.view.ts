import $ from 'jquery';

import { Thumb } from '../../components';
import {ClassName, ModelOption} from '../../utils';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const opts: ModelOption = this.getOpts();
    const isRangeTrue: boolean = opts.range;
    const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
    const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

    const checkValueThumbs = (from: number, to: number, max: number, gap: number) => {
        if (to < from + gap) {
            from + gap > max ? opts.from = to - gap : opts.to = from + gap;
        }
    };

    if (isRangeTrue) {
        checkValueThumbs(opts.from, opts.to, opts.max, opts.gap);
        $thumbMin.length === 0 ? thumb.getMinThumb(opts.min, opts.max, opts.from, opts.step) : null;
        $thumbMax.length === 0 ? thumb.getMaxThumb(opts.min, opts.max, opts.to, opts.step) : null;

    } else {
        $thumbMax.length !== 0 ? $thumbMax.remove() : null;
        $thumbMin.length === 0 ? thumb.getMinThumb(opts.min, opts.max, opts.from, opts.step) : null;
    }
}

export default setRange;