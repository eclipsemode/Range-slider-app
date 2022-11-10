import $ from 'jquery';

import { Bar, Progress } from '../../components';

import { findMaxPercent, findMinPercent, ClassName, progressCalc } from '../../utils';

function setBar(): void {
    const bar: Bar = new Bar(this.selectorState);
    const progress: Progress = new Progress(this.selectorState);
    const $bar: JQuery = $(this.selectorState + ' ' + ClassName.BAR_LINE);
    const isProgressTrue: boolean = this.opts.progress;
    const isRangeTrue: boolean = this.opts.range;

    $bar.length === 0 ? bar.getBar() : null;

    if (isProgressTrue) {
        $(this.selectorState + ' ' + ClassName.PROGRESS).length === 0
            ? progress.getProgress()
            : null;
    } else $(this.selectorState + ' ' + ClassName.PROGRESS).remove();

    if (isRangeTrue) {
        // $progress.css({
        //     width: 'auto',
        //     height: 100 + '%',
        //     left: findMinPercent(minVal, +this.opts.from, +this.opts.max),
        //     right: findMaxPercent(minVal, +this.opts.to, +this.opts.max)
        // });
    } else {
        $(this.selectorState + ' ' + ClassName.BAR_LINE).on('click', (e) => {
            if (e.currentTarget || e.target.classList.contains(ClassName.PROGRESS)) {
                $(this.selectorState + ' ' + ClassName.MIN).css('left', e.offsetX);
                $(this.selectorState + ' ' + ClassName.PROGRESS).width(e.offsetX);

            }
});
        // $progress.css({
        //     width: findMinPercent(minVal, +this.opts.from, parseInt($minThumb.attr('max'))),
        //     height: 100 + '%',
        //     left: 0,
        //     right: 0
        // });
    }
}

export default setBar;