import $ from 'jquery';

import Rulers from '../../components/rulers/Rulers';

import abbreviateNumber from '../../utils/abbreviateNumber';

function setRulers (): void {
    const rulers: Rulers = new Rulers(this.selectorState);
    const $rulers = $(`${this.selectorState} .js-slider-app__rulers`);
    const isRulersTrue: boolean = this.optionsState.rulers;

    if (isRulersTrue) {

        $rulers.remove();
        // noinspection JSJQueryEfficiency
        $(`${this.selectorState} .js-slider-app__rulers-values`).remove();
        rulers.getRulers();

        const isFindValueByPercent = (percent: number): number =>
            this.optionsState.min + ((this.optionsState.max - this.optionsState.min) * percent / 100);

        // noinspection JSJQueryEfficiency
        const $values: JQuery = $(`${this.selectorState} .js-slider-app__rulers-values`);
        const $minThumb: JQuery = $(`${this.selectorState} .js-slider-app__input-min`);
        const $maxThumb: JQuery = $(`${this.selectorState} .js-slider-app__input-max`);

        $values.children().each((index, element) => {
            const minVal: number = this.optionsState.min;
            const maxVal: number = this.optionsState.max;
            const isPercentTrue: boolean = this.optionsState.percent;

            switch (index) {
                case 0:
                    isPercentTrue
                        ? element.innerText = '0%'
                        : element.innerText = abbreviateNumber(maxVal, minVal, 0);

                    element.addEventListener('click', () => {
                        $minThumb.val(this.optionsState.min);
                        this.optionsState.from = +$minThumb.val();
                        this.setBar();
                        this.setTooltip();
                        this.setConfig();
                    });
                    break;
                case 1:
                    isPercentTrue
                        ? element.innerText = '20%'
                        : element.innerText = abbreviateNumber(maxVal, minVal, 20);

                    element.addEventListener('click', () => {
                        if (this.optionsState.range) {
                            const isMinLessMaxWithGap: boolean =
                                +isFindValueByPercent(20) >
                                +this.optionsState.to - +this.optionsState.gap;

                            isMinLessMaxWithGap
                                ? $minThumb.val(+this.optionsState.to - +this.optionsState.gap)
                                : $minThumb.val(isFindValueByPercent(20));
                        } else {
                            $minThumb.val(isFindValueByPercent(20));
                        }
                        this.optionsState.from = +$minThumb.val();
                        this.setBar();
                        this.setTooltip();
                        this.setConfig();
                    });
                    break;
                case 2:
                    isPercentTrue
                        ? element.innerText = '40%'
                        : element.innerText = abbreviateNumber(maxVal, minVal, 40);

                    element.addEventListener('click', () => {
                        if (this.optionsState.range) {
                            const isMinLessMaxWithGap: boolean =
                                +isFindValueByPercent(40) >
                                +this.optionsState.to - +this.optionsState.gap;

                            isMinLessMaxWithGap
                                ? $minThumb.val(+this.optionsState.to - +this.optionsState.gap)
                                : $minThumb.val(isFindValueByPercent(40));
                        } else {
                            $minThumb.val(isFindValueByPercent(40));
                        }
                        this.optionsState.from = +$minThumb.val();
                        this.setBar();
                        this.setTooltip();
                        this.setConfig();
                    });
                    break;
                case 3:
                    isPercentTrue
                        ? element.innerText = '60%'
                        : element.innerText = abbreviateNumber(maxVal, minVal, 60);

                    element.addEventListener('click', () => {
                        if (this.optionsState.range) {
                            const isMaxMoreThanMinWithGap: boolean = +isFindValueByPercent(60)
                                < +this.optionsState.from + +this.optionsState.gap;

                            isMaxMoreThanMinWithGap
                                ? $maxThumb.val(+this.optionsState.from + +this.optionsState.gap)
                                : $maxThumb.val(isFindValueByPercent(60));
                            this.optionsState.to = +$maxThumb.val();
                        } else {
                            $minThumb.val(isFindValueByPercent(60));
                            this.optionsState.from = +$minThumb.val();
                        }
                        this.setBar();
                        this.setTooltip();
                        this.setConfig();
                    });
                    break;
                case 4:
                    isPercentTrue
                        ? element.innerText = '80%'
                        : element.innerText = abbreviateNumber(maxVal, minVal, 80);

                    element.addEventListener('click', () => {
                        if (this.optionsState.range) {
                            const isMaxMoreThanMinWithGap: boolean = +isFindValueByPercent(80)
                                < +this.optionsState.from + +this.optionsState.gap;

                            isMaxMoreThanMinWithGap
                                ? $maxThumb.val(+this.optionsState.from + +this.optionsState.gap)
                                : $maxThumb.val(isFindValueByPercent(80));
                            this.optionsState.to = +$maxThumb.val();
                        } else {
                            $minThumb.val(isFindValueByPercent(80));
                            this.optionsState.from = +$minThumb.val();
                        }
                        this.setBar();
                        this.setTooltip();
                        this.setConfig();
                    });
                    break;
                case 5:
                    isPercentTrue
                        ? element.innerText = '100%'
                        : element.innerText = abbreviateNumber(maxVal, minVal, 100);

                    element.addEventListener('click', () => {
                        if (this.optionsState.range) {
                            $maxThumb.val(this.optionsState.max);
                            this.optionsState.to = +$maxThumb.val();
                        } else {
                            $minThumb.val(this.optionsState.max);
                            this.optionsState.from = +$minThumb.val();
                        }
                        this.setBar();
                        this.setTooltip();
                        this.setConfig();
                    });
                    break;
            }
        });
    } else {
        $rulers.remove();
        $(`${this.selectorState} .js-slider-app__rulers-values`).remove();
    }
}

export default setRulers;