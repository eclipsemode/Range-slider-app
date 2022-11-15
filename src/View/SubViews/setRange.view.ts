import $ from 'jquery';

import { Thumb } from '../../components';
import { ClassName, progressCalc } from '../../utils';

function setRange(): void {
    const thumb: Thumb = new Thumb(this.selectorState);
    const isRangeTrue: boolean = this.opts.range;
    const isProgressTrue: boolean = this.opts.progress;

    const checkValueThumbs = (from: number, to: number, max: number, gap: number, step: number) => {
        if (from > to - gap) {
            to - step > to - gap ? this.opts.from = to - gap : this.opts.from = to - step;
        }
    };

    if (isRangeTrue) {
        const $thumbMin = $(this.selectorState + ' ' + '.js-slider-app__thumb-min');
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

        checkValueThumbs(this.opts.from, this.opts.to, this.opts.max, this.opts.gap, this.opts.step);
        $thumbMin.length === 0
            ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;
        $thumbMax.length === 0
            ? thumb.getMaxThumb(this.opts.min, this.opts.max, this.opts.to, this.opts.step) : null;
        this.opts.to = +$(this.selectorState + ' ' + ClassName.MAX).val();
    } else {
        $(this.selectorState + ' ' + ClassName.MAX).length !== 0 ? $(this.selectorState + ' ' + ClassName.MAX).remove() : null;
        $(this.selectorState + ' ' + '.js-slider-app__thumb-min').length === 0
            ? thumb.getMinThumb(this.opts.min, this.opts.max, this.opts.from, this.opts.step) : null;

        const $thumbMin: JQuery = $(this.selectorState + ' ' + ClassName.MIN);
        const $barLine: JQuery = $('.js-slider-app__line');
        const $progress: JQuery = $(this.selectorState + ' ' + ClassName.PROGRESS);

        $thumbMin.on('mousedown', (e) => {
            const sliderWidth: number = e.target.parentElement.offsetWidth;

            $thumbMin.on('dragstart', () => false);

            const moveAt = (e: JQuery.MouseMoveEvent | JQuery.MouseDownEvent) => {
                this.opts.from = Math.ceil(progressCalc(e, sliderWidth, $barLine)) + '%';
                $thumbMin.css('left', this.opts.from);
            };

            moveAt(e);

            $(document).on('mousemove', e => moveAt(e));

            $thumbMin.on('mouseleave', () => {
                $(document).on('mouseup', () => {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    $thumbMin.off('mouseleave');
                });
            });
            $thumbMin.on('mouseup', () => {
                $(document).off('mousemove');
                $thumbMin.off('mouseup');
            });
        });

        if (isProgressTrue) {
            $thumbMin.on('mousedown', () => {
                $(document).on('mousemove', () => {
                    $progress.css('width', this.opts.from);
                });
            });
        }
    }
}

export default setRange;