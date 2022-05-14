declare type Subscriber = (...args: any[]) => any

declare interface Subscribers {
    [key: string]: Array<Subscriber>
}

export {Subscriber, Subscribers};