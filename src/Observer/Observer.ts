import { ModelOption } from '../utils';

type IListener = (option: ModelOption) => void;

interface ISubscribers {
    [key: string]: IListener;
}

class Observer {
    private subscribers: ISubscribers = {};

    constructor(private _opts: ModelOption = null) {}

    subscribe(listener: IListener) {
        const listenerId = Math.random().toString(36).substring(2);
        this.subscribers[listenerId] = listener;
        return () => delete this.subscribers[listenerId];
    }

    get opts() {
        return this._opts;
    }

    set opts(newValue: ModelOption) {
        this._opts = newValue;
        this.notify();
    }

    notify() {
        for (const listenerId in this.subscribers) {
            const listener = this.subscribers[listenerId];
            listener(this._opts);
        }
    }
}

export default Observer;