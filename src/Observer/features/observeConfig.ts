import Observer from '../Observer';

function observeConfig() {
    const observable = new Observer(this.opts);

    observable.subscribe(option => {
        this.opts = {
            ...option
        };
        this.setRange();
        this.setBar();
        this.setControl();
        this.setConfig();
        this.setTooltip();
        this.setRulers();
        this.setColor();
        this.setVertical();
        this.thumbsObserver();
    });

    return observable;
}

export default observeConfig;