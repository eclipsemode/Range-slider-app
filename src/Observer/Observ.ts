class Observ {
    constructor(private _value: any = null, private subscribers: any = {}) {}

    subscribe(listener: any) {
        const listenerId = Math.random().toString(36).substr(2,9);
        this.subscribers[listenerId] = listener;
        return () => delete this.subscribers[listenerId];
    }

    get value() {
        return this._value;
    }

    set value(newValue: any) {
        this._value = newValue;
        this.notify();
    }

    notify() {
        for (const listenerId in this.subscribers) {
            const listener = this.subscribers[listenerId];
            listener(this._value);
        }
    }
}

export default Observ;