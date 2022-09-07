import $ from 'jquery';

import { Bar, Progress } from '../../components';

import { findMaxPercent, findMinPercent, ClassName } from '../../utils';

function setBar(): void {
    const bar: Bar = new Bar(this.selectorState);
    const progress: Progress = new Progress(this.selectorState);
    const $bar: JQuery = $(this.selectorState + ' ' + ClassName.BAR_LINE);

    $bar.length === 0 ? bar.getBar() : null;

    const $minThumb = $(this.selectorState + ' ' + ClassName.MIN);
    const minVal: number = this.optionsState.min;
    const isProgressTrue: boolean = this.optionsState.progress;
    const isRangeTrue: boolean = this.optionsState.range;

    if (isProgressTrue) {
        $(this.selectorState + ' ' + ClassName.PROGRESS).length === 0
            ? progress.getProgress()
            : null;
    } else $(this.selectorState + ' ' + ClassName.PROGRESS).remove();

    const $progress: JQuery = $(this.selectorState + ' ' + ClassName.PROGRESS);

    if (isRangeTrue) {
        $progress.css({
            width: 'auto',
            height: 100 + '%',
            left: findMinPercent(minVal, this.opts.from, this.opts.max),
            right: findMaxPercent(minVal, this.opts.to, this.opts.max)
        });
    } else {
        $progress.css({
            width: findMinPercent(minVal, this.opts.from, parseInt($minThumb.attr('max'))),
            height: 100 + '%',
            left: 0
        });
    }
}

export default setBar;