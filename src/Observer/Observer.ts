import ObserverEvents from './ObserverEvents';
import {Subscriber, Subscribers} from '../utils/Observer';

class Observer {
    private readonly subscribers: Subscribers;
    constructor() {
        this.subscribers = {};
    }

    // subscribe(subscriber: ObserverEvents, callback: Subscriber) {
    //     this.subscribers[subscriber] = [callback];
    // }

    notify<T>(subscriber: ObserverEvents, data: T) {
        if (this.subscribers[subscriber]) {
            this.subscribers[subscriber].forEach((callback: Subscriber) => callback(data));
        }
    }
}

export default Observer;