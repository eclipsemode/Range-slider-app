import $ from 'jquery';

import { Thumb } from '../../components';
import { ClassName } from '../../utils';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const isRangeTrue: boolean = this.opts.range;
    const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
    const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

    const checkValueThumbs = (from: number, to: number, max: number, gap: number, step: number) => {
        if (from > to - gap) {
            to - step > to - gap ? this.opts.from = to - gap : this.opts.from = to - step;
        }
    };

    if (isRangeTrue) {
        checkValueThumbs(this.opts.from, this.opts.to, this.opts.max, this.opts.gap, this.opts.step);
        $thumbMin.length === 0
            ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;
        $thumbMax.length === 0
            ? thumb.getMaxThumb(this.opts.min, this.opts.max, this.opts.to, this.opts.step) : null;
    } else {
        $thumbMax.length !== 0 ? $thumbMax.remove() : null;
        $thumbMin.length === 0
            ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;
    }
}

export default setRange;