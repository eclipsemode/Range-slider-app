import { ModelOption } from '../utils';

class Observer {
    private opts: ModelOption;

    constructor() {
        this.opts = {};
    }

    subscribeOpts (obj: ModelOption) {
        this.opts = obj;
    }

    getOpts() {
        return this.opts;
    }
}

export default Observer;