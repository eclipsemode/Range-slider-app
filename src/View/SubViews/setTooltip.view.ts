import $ from 'jquery';

import { Tooltip } from '../../components';
import { ClassName } from '../../utils';

function setTooltip(): void {
    const tooltip: Tooltip = new Tooltip(this.selectorState);
    const isTooltipTrue: boolean = this.optionsState.tooltip;
    const isPercentTrue: boolean = this.optionsState.percent;
    const isRangeTrue: boolean = this.optionsState.range;
    const isVerticalTrue: boolean = this.optionsState.vertical;

    const isGetTooltipIfMissing = (): void => {
        if (isTooltipTrue) {
            $(this.selectorState + ' ' + ClassName.TOOLTIP_LINE).length === 0
                ? tooltip.getTooltipLine()
                : null;

            $(this.selectorState + ' ' + ClassName.TOOLTIP_FIRST).length === 0
                ? tooltip.getFirstTooltip()
                : null;

            if (isRangeTrue) {
                $(this.selectorState + ' ' + ClassName.TOOLTIP_SECOND).length === 0
                    ? tooltip.getSecondTooltip()
                    : null;
            } else {
                $(this.selectorState + ' ' + ClassName.TOOLTIP_LINE).remove();
                tooltip.getTooltipLine();
                $(this.selectorState + ' ' + ClassName.TOOLTIP_FIRST).length === 0
                    ? tooltip.getFirstTooltip()
                    : null;
            }
        } else {
            $(this.selectorState + ' ' + ClassName.TOOLTIP_LINE).remove();
            return;
        }
    };
    isGetTooltipIfMissing();

    const $tooltipMin: JQuery =
        $(this.selectorState + ' ' + ClassName.TOOLTIP_FIRST);
    const $inputMin: JQuery = $(this.selectorState + ' ' + ClassName.MIN);

    $tooltipMin.css({
        left: isVerticalTrue ? 'auto' : ((+this.optionsState.from - +this.optionsState.min)
            / (+this.optionsState.max - +this.optionsState.min)) * 100 + '%',
        bottom: isVerticalTrue ? 'calc(' + ((+this.optionsState.from - +this.optionsState.min)
            / (+this.optionsState.max - +this.optionsState.min)) * 100 + '% - 7px)' : '1.5rem'
    });

    $inputMin.on({
        input: () => {
            $tooltipMin.css({
                left: isVerticalTrue ? 'auto' : ((+this.optionsState.from - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min)) * 100 + '%',
                bottom: isVerticalTrue ? 'calc(' + ((+this.optionsState.from - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min)) * 100 + '% - 7px)' : '1.5rem'
            });
        }
    });

    if (!isPercentTrue) {
        $tooltipMin.text(this.optionsState.from);

        $inputMin.on('input', () => {
            $tooltipMin.text(this.optionsState.from);
        });
    } else {
        $tooltipMin.text(
            Math.trunc((+this.optionsState.from - +this.optionsState.min)
                / (+this.optionsState.max - +this.optionsState.min) * 100) + '%');

        $inputMin.on('input', () =>
            $tooltipMin.text(
                Math.trunc((+this.optionsState.from - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min) * 100) + '%'));
    }

    if (isRangeTrue) {
        const $tooltipMax: JQuery =
            $(this.selectorState + ' ' + ClassName.TOOLTIP_SECOND);
        const $inputMax: JQuery = $(this.selectorState + ' ' + ClassName.MAX);

        $tooltipMax.css({
            left: isVerticalTrue ? 'auto' : (((+this.optionsState.to - +this.optionsState.min)
                / (+this.optionsState.max - +this.optionsState.min)) * 100) + '%',
            bottom: isVerticalTrue ? 'calc(' + (((+this.optionsState.to - +this.optionsState.min)
                / (+this.optionsState.max - +this.optionsState.min)) * 100) + '% - 7px)' : '1.5rem'
        });

        $inputMax.on({
            input: () => {
                $tooltipMax.css({
                    left: isVerticalTrue ? 'auto' : (((+this.optionsState.to - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min)) * 100) + '%',
                    bottom: isVerticalTrue ? 'calc(' + (((+this.optionsState.to - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min)) * 100) + '% - 7px)' : '1.5rem'
                });
            }
        });

        if (!isPercentTrue) {
            $tooltipMax.text(this.optionsState.to);
            $inputMax.on('input', () => $tooltipMax.text(this.optionsState.to));
        } else {
            $tooltipMax.text(
                Math.trunc((+this.optionsState.to - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min) * 100) + '%');

            $inputMax.on('input', () =>
                $tooltipMax.text(
                    Math.trunc((+this.optionsState.to - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min) * 100) + '%'));
        }
    }
}

export default setTooltip;