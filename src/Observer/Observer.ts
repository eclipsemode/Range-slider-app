import { ModelOption } from '../utils';

class Observer {
    observers: CallableFunction[];
    opts: ModelOption;

    constructor() {
        this.observers = [];
        this.opts = {};
    }

    subscribe (...fn: CallableFunction[]) {
        this.observers.push(...fn);
    }

    subscribeOpts (obj: ModelOption) {
        this.opts = obj;
    }

    updateOpts (opts: ModelOption) {
        this.opts = opts;
    }

    unsubscribe (fn: CallableFunction) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    broadcast () {
        this.observers.forEach(subscriber => subscriber());
    }
}

export default Observer;