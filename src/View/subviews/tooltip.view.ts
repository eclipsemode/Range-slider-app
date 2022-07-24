function setTooltip(context: any): void {
    const isTooltipTrue: boolean = context.optionsState.tooltip;
    const isPercentTrue: boolean = context.optionsState.percent;
    const isRangeTrue: boolean = context.optionsState.range;

    const isGetTooltipIfMissing = (): void => {
        if (isTooltipTrue) {
            $(`${context.selectorState} .js-slider-app__tooltip--first`).length === 0
                ? context.tooltip.getFirstTooltip()
                : null;
            context.optionsState.range &&
            $(`${context.selectorState} .js-slider-app__tooltip--second`).length === 0
                ? context.tooltip.getSecondTooltip()
                : null;
        } else {
            $(`${context.selectorState} .js-slider-app__tooltip-line`).remove();
            return;
        }
    };
    isGetTooltipIfMissing();
    context.setVertical();

    const $tooltipMin: JQuery =
        $(`${context.selectorState} .js-slider-app__tooltip--first`);
    const $inputMin: JQuery = $(`${context.selectorState} .js-slider-app__input-min`);

    $tooltipMin.css({
        left: ((+context.optionsState.from - +context.optionsState.min)
            / (+context.optionsState.max - +context.optionsState.min)) * 100 + '%',
        bottom: '1.5rem'
    });

    $inputMin.on({
        input: () => {
            $tooltipMin.css('left',
                ((+context.optionsState.from - +context.optionsState.min)
                    / (+context.optionsState.max - +context.optionsState.min)) * 100 + '%');
        }
    });

    if (!isPercentTrue) {
        $tooltipMin.text(context.optionsState.from);

        $inputMin.on('input', () => {
            $tooltipMin.text(context.optionsState.from);
        });
    } else {
        $tooltipMin.text(
            Math.trunc((+context.optionsState.from - +context.optionsState.min)
                / (+context.optionsState.max - +context.optionsState.min) * 100) + '%');

        $inputMin.on('input', () =>
            $tooltipMin.text(
                Math.trunc((+context.optionsState.from - +context.optionsState.min)
                    / (+context.optionsState.max - +context.optionsState.min) * 100) + '%'));
    }

    if (isRangeTrue) {
        const $tooltipMax: JQuery =
            $(`${context.selectorState} .js-slider-app__tooltip--second`);
        const $inputMax: JQuery = $(`${context.selectorState} .js-slider-app__input-max`);

        $tooltipMax.css(
            'left',
            (((+context.optionsState.to - +context.optionsState.min)
                / (+context.optionsState.max - +context.optionsState.min)) * 100) + '%');

        $inputMax.on({
            input: () => {
                $tooltipMax.css('left',
                    (((+context.optionsState.to - +context.optionsState.min)
                        / (+context.optionsState.max - +context.optionsState.min)) * 100) + '%');
            }
        });

        if (!isPercentTrue) {
            $tooltipMax.text(context.optionsState.to);
            $inputMax.on('input', () => $tooltipMax.text(context.optionsState.to));
        } else {
            $tooltipMax.text(
                Math.trunc((+context.optionsState.to - +context.optionsState.min)
                    / (+context.optionsState.max - +context.optionsState.min) * 100) + '%');

            $inputMax.on('input', () =>
                $tooltipMax.text(
                    Math.trunc((+context.optionsState.to - +context.optionsState.min)
                        / (+context.optionsState.max - +context.optionsState.min) * 100) + '%'));
        }
    }
}

export default setTooltip;