import { ModelOption } from '../utils';

class Observer {
    private optionsObserver: Partial<ModelOption>;

    constructor() {
        this.optionsObserver = {};
    }

    set opts(opts: Partial<ModelOption>) {
        this.optionsObserver = opts;
    }

    get opts() {
        return this.optionsObserver;
    }
}

export default Observer;