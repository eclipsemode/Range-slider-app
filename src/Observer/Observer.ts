import ObserverTypesEnum from './ObserverTypes.enum';

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

    broadcast (type: ObserverTypesEnum) {
        this.observers.forEach(subscriber => {
            if (type === ObserverTypesEnum.THUMBS) {
                subscriber.name.slice(6) === 'setConfig' ? subscriber() : null;
                subscriber.name.slice(6) === 'setTooltip' ? subscriber() : null;
            }
        });
    }
}

export default Observer;