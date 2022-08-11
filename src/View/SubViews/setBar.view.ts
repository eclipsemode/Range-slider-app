import $ from 'jquery';

import Progress from '../../components/progress/Progress';
import Bar from '../../components/bar/Bar';

import {findMaxPercent, findMinPercent} from '../../utils/findThumbPercent';

function setBar(): void {
    const bar: Bar = new Bar(this.selectorState);
    const progress: Progress = new Progress(this.selectorState);
    const $bar: JQuery = $(`${this.selectorState} .js-slider-app__bar-line`);

    $bar.length === 0 ? bar.getBar() : null;

    const $range = $(`${this.selectorState} .js-slider-app__input`);
    const $minThumb = $(`${this.selectorState} .js-slider-app__input-min`);
    const minVal: number = this.optionsState.min;
    const isProgressTrue: boolean = this.optionsState.progress;
    const isRangeTrue: boolean = this.optionsState.range;
    const gap: number = this.optionsState.gap;
    const $maxThumb: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);

    if (isProgressTrue) {
        $(`${this.selectorState} .js-slider-app__progress`).length === 0
            ? progress.getProgress()
            : null;
    } else $(`${this.selectorState} .js-slider-app__progress`).remove();

// noinspection JSJQueryEfficiency
    const $progress: JQuery = $(`${this.selectorState} .js-slider-app__progress`);

    if (isRangeTrue) {
        // if (+this.optionsState.min < 0) {
        //     gap = ((+this.optionsState.max + Math.abs(+this.optionsState.min))
        //         - (+this.optionsState.min + Math.abs(+this.optionsState.min))) / 100 * 10;
        // }

        $progress.css({
            width: 'auto',
            height: 100 + '%',
            left: findMinPercent(minVal, Number($minThumb.val()), parseInt($minThumb.attr('max'))),
            right: findMaxPercent(minVal, Number($maxThumb.val()), parseInt($maxThumb.attr('max')))
        });

        $range.each(function (index, element) {
            $(element).on('input', (event) => {
                const minThumbValue = Number($minThumb.val());
                const maxThumbValue = Number($maxThumb.val());
                const isValueLessGap: boolean = maxThumbValue - minThumbValue < gap;
                const hasClassInputMin: boolean =
                    $(event.currentTarget).hasClass('js-slider-app__input-min');

                if (isValueLessGap) {
                    hasClassInputMin
                        ? $(this).val(maxThumbValue - gap)
                        : $(this).val(minThumbValue + gap);
                }

                $progress.css({
                    width: 'auto',
                    left: findMinPercent(
                        minVal,
                        Number($minThumb.val()),
                        parseInt($minThumb.attr('max'))),
                    right: findMaxPercent(
                        minVal,
                        Number($maxThumb.val()),
                        parseInt($maxThumb.attr('max'))),
                });
            });
        });
    } else {
        $progress.css({
            width: findMinPercent(minVal, Number($minThumb.val()), parseInt($minThumb.attr('max'))),
            height: 100 + '%'
        });
    }
}

export default setBar;