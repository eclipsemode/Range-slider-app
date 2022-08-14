class Observer {
    observers: CallableFunction[];

    constructor() {
        this.observers = [];
    }

    subscribe (...fn: CallableFunction[]) {
        this.observers.push(...fn);
    }

    unsubscribe (fn: CallableFunction) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    broadcast () {
        this.observers.forEach(subscriber => {
            subscriber();
        });
    }
}

export default Observer;