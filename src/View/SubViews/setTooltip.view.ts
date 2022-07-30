import $ from 'jquery';

import Tooltip from '../../components/tooltip/Tooltip';

function setTooltip(): void {
    const tooltip: Tooltip = new Tooltip(this.selectorState);
    const isTooltipTrue: boolean = this.optionsState.tooltip;
    const isPercentTrue: boolean = this.optionsState.percent;
    const isRangeTrue: boolean = this.optionsState.range;

    const isGetTooltipIfMissing = (): void => {
        if (isTooltipTrue) {
            $(`${this.selectorState} .js-slider-app__tooltip--first`).length === 0
                ? tooltip.getFirstTooltip()
                : null;
            this.optionsState.range &&
            $(`${this.selectorState} .js-slider-app__tooltip--second`).length === 0
                ? tooltip.getSecondTooltip()
                : null;
        } else {
            $(`${this.selectorState} .js-slider-app__tooltip-line`).remove();
            return;
        }
    };
    isGetTooltipIfMissing();
    this.setVertical();

    const $tooltipMin: JQuery =
        $(`${this.selectorState} .js-slider-app__tooltip--first`);
    const $inputMin: JQuery = $(`${this.selectorState} .js-slider-app__input-min`);

    $tooltipMin.css({
        left: ((+this.optionsState.from - +this.optionsState.min)
            / (+this.optionsState.max - +this.optionsState.min)) * 100 + '%',
        bottom: '1.5rem'
    });

    $inputMin.on({
        input: () => {
            $tooltipMin.css('left',
                ((+this.optionsState.from - +this.optionsState.min)
                    / (+this.optionsState.max - +this.optionsState.min)) * 100 + '%');
        }
    });

    if (!isPercentTrue) {
        $tooltipMin.text(this.optionsState.from);

        $inputMin.on('input', () => {
            $tooltipMin.text(+this.optionsState.from);
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
            $(`${this.selectorState} .js-slider-app__tooltip--second`);
        const $inputMax: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);

        $tooltipMax.css(
            'left',
            (((+this.optionsState.to - +this.optionsState.min)
                / (+this.optionsState.max - +this.optionsState.min)) * 100) + '%');

        $inputMax.on({
            input: () => {
                $tooltipMax.css('left',
                    (((+this.optionsState.to - +this.optionsState.min)
                        / (+this.optionsState.max - +this.optionsState.min)) * 100) + '%');
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