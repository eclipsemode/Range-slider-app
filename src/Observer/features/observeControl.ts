import Observer from '../Observer';
import $ from 'jquery';
import { ClassName } from '../../utils';

function observeControl() {
    const observable = new Observer(this.opts);

    observable.subscribe(option => {
        const $controlTo = $(`${ this.selectorState }__control-to`);
        const $controlFrom = $(`${ this.selectorState }__control-from`);
        const $thumbMin = $(this.selectorState + ' ' + ClassName.MIN);
        const $thumbMax = $(this.selectorState + ' ' + ClassName.MAX);

        $thumbMin.val(option.from);
        this.opts.range ? $thumbMax?.val(option.to) : null;
        this.opts = {
            ...option,
            from: +$thumbMin.val(),
            to: this.opts.range ? +$thumbMax?.val() : this.opts.to
        };

        $thumbMin.prop({
            step: this.opts.step,
            min: this.opts.min,
            max: this.opts.max
        });
        this.opts.range ?
            $thumbMax.prop({
                step: this.opts.step,
                min: this.opts.min,
                max: this.opts.max
            }) : null;
        this.opts = {
            ...this.opts,
            from: +$thumbMin.val(),
            to: this.opts.range ? +$thumbMax?.val() : this.opts.to
        };
        $controlFrom.prop({
            step: this.opts.step,
            value: this.opts.from
        });
        $controlTo.prop({
            step: this.opts.step,
            value: this.opts.to
        });

        this.setBar();
        this.setTooltip();
        this.setRulers();
    });
    return observable;
}

export default observeControl;