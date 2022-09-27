import Observer from '../Observer';
import $ from 'jquery';

function observeThumbs() {
    const observable = new Observer(this.opts);
    observable.subscribe(option => {
        $(`${ this.selectorState }__control-from`).val(option.from);
        $(`${ this.selectorState }__control-to`).val(option.to);
        this.opts = option;
        this.setBar();
        this.setTooltip();
    });
    return observable;
}

export default observeThumbs;