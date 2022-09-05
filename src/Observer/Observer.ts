import { ModelOption } from '../utils';

class Observer {
    private optionsObserver: ModelOption;

    constructor() {
        this.optionsObserver = {};
    }

    set opts(opts: ModelOption) {
        this.optionsObserver = opts;
    }

    get opts() {
        return this.optionsObserver;
    }
}

export default Observer;