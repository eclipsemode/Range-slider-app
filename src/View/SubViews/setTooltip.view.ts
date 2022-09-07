import $ from 'jquery';

import { Tooltip } from '../../components';
import { ClassName } from '../../utils';

function setTooltip(): void {
    const tooltip: Tooltip = new Tooltip(this.selectorState);
    const isTooltipTrue: boolean = this.opts.tooltip;
    const isPercentTrue: boolean = this.opts.percent;
    const isRangeTrue: boolean = this.opts.range;
    const isVerticalTrue: boolean = this.opts.vertical;

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
        left: isVerticalTrue ? 'auto' : ((this.opts.from - this.opts.min)
            / (this.opts.max - this.opts.min)) * 100 + '%',
        bottom: isVerticalTrue ? 'calc(' + ((this.opts.from - this.opts.min)
            / (this.opts.max - this.opts.min)) * 100 + '% - 7px)' : '1.5rem'
    });

    $inputMin.on({
        input: () => {
            $tooltipMin.css({
                left: isVerticalTrue ? 'auto' : ((this.opts.from - this.opts.min)
                    / (this.opts.max - this.opts.min)) * 100 + '%',
                bottom: isVerticalTrue ? 'calc(' + ((this.opts.from - this.opts.min)
                    / (this.opts.max - this.opts.min)) * 100 + '% - 7px)' : '1.5rem'
            });
        }
    });

    if (!isPercentTrue) {
        $tooltipMin.text(this.opts.from);

        $inputMin.on('input', () => {
            $tooltipMin.text(this.opts.from);
        });
    } else {
        $tooltipMin.text(
            Math.trunc((this.opts.from - this.opts.min)
                / (this.opts.max - this.opts.min) * 100) + '%');

        $inputMin.on('input', () =>
            $tooltipMin.text(
                Math.trunc((this.opts.from - this.opts.min)
                    / (this.opts.max - this.opts.min) * 100) + '%'));
    }

    if (isRangeTrue) {
        const $tooltipMax: JQuery =
            $(this.selectorState + ' ' + ClassName.TOOLTIP_SECOND);
        const $inputMax: JQuery = $(this.selectorState + ' ' + ClassName.MAX);

        $tooltipMax.css({
            left: isVerticalTrue ? 'auto' : (((this.opts.to - this.opts.min)
                / (this.opts.max - this.opts.min)) * 100) + '%',
            bottom: isVerticalTrue ? 'calc(' + (((this.opts.to - this.opts.min)
                / (this.opts.max - this.opts.min)) * 100) + '% - 7px)' : '1.5rem'
        });

        $inputMax.on({
            input: () => {
                $tooltipMax.css({
                    left: isVerticalTrue ? 'auto' : (((this.opts.to - this.opts.min)
                        / (this.opts.max - this.opts.min)) * 100) + '%',
                    bottom: isVerticalTrue ? 'calc(' + (((this.opts.to - this.opts.min)
                        / (this.opts.max - this.opts.min)) * 100) + '% - 7px)' : '1.5rem'
                });
            }
        });

        if (!isPercentTrue) {
            $tooltipMax.text(this.opts.to);
            $inputMax.on('input', () => $tooltipMax.text(this.opts.to));
        } else {
            $tooltipMax.text(
                Math.trunc((this.opts.to - this.opts.min)
                    / (this.opts.max - this.opts.min) * 100) + '%');

            $inputMax.on('input', () =>
                $tooltipMax.text(
                    Math.trunc((this.opts.to - this.opts.min)
                        / (this.opts.max - this.opts.min) * 100) + '%'));
        }
    }
}

export default setTooltip;