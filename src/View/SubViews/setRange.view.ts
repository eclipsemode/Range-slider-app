import $ from 'jquery';

import { Thumb } from '../../components';
import { ClassName } from '../../utils';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const isRangeTrue: boolean = this.opts.range;
    const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
    const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

    const checkValueThumbs = (from: number, to: number, max: number, gap: number) => {
        if (to < from + gap) {
            from + gap > max ? this.opts.from = to - gap : this.opts.to = from + gap;
        }
    };

    if (isRangeTrue) {
        checkValueThumbs(this.opts.from, this.opts.to, this.opts.max, this.opts.gap);
        $thumbMin.length === 0
            ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;
        $thumbMax.length === 0
            ? thumb.getMaxThumb(this.opts.min, this.opts.max, this.opts.to, this.opts.step) : null;
        this.opts.to = $(this.selectorState + ' ' + ClassName.MAX).val();
    } else {
        $thumbMax.length !== 0 ? $thumbMax.remove() : null;
        $thumbMin.length === 0
            ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;
    }
}

export default setRange;