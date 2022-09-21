import {ModelOption} from '../utils';

interface IListener {
    [key: string]: any;
}

interface ISubscribers {
    [key: string]: any;
}

class Observ {
    private subscribers: ISubscribers = {};

    constructor(private _options: ModelOption) {}

    subscribe(listener: IListener) {
        const listenerId = Math.random().toString(36).substring(2);
        this.subscribers[listenerId] = listener;
        return () => delete this.subscribers[listenerId];
    }

    get options() {
        return this._options;
    }

    set options(newValue: ModelOption) {
        this._options = newValue;
        this.notify();
    }

    notify() {
        for (const listenerId in this.subscribers) {
            const listener = this.subscribers[listenerId];
            listener(this._options);
        }
    }
}

export default Observ;


// interface IListener {
//     [key: string]: any;
// }
//
// type IValue = string | null;
//
// interface ISubscribers {
//     [key: string]: any;
// }

// class Observ {
//     private subscribers: ISubscribers = {};
//
//     constructor(private _value: IValue = null) {}
//
//     subscribe(listener: IListener) {
//         const listenerId = Math.random().toString(36).substring(2);
//         this.subscribers[listenerId] = listener;
//         return () => delete this.subscribers[listenerId];
//     }
//
//     get value() {
//         return this._value;
//     }
//
//     set value(newValue: string) {
//         this._value = newValue;
//         this.notify();
//     }
//
//     notify() {
//         for (const listenerId in this.subscribers) {
//             const listener = this.subscribers[listenerId];
//             listener(this._value);
//         }
//     }
// }
//
// export default Observ;