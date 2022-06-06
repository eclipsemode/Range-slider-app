class Observer {
    private observers: any[];

    constructor() {
        this.observers = [];
    }

    subscribe (fn: any) {
        this.observers.push(fn);
    }

    unsubscribe (fn: any) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    broadcast (data: any) {
        this.observers.forEach(subscriber => subscriber(data));
    }
}

export default Observer;