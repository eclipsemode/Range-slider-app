import './assets/style/style.scss';
import { Slider } from './Controller/slider.controller';

new Slider('.slider', {
    configPanel: true,
    tooltip: true,
    range: false,
    min: -1000
});

// function observeHtml(className: string) {
//     const $elem = $(className);
//     if (!$elem) return;
//
//     const value = $elem.text();
//     const observable = new Observer(value);
//
//     observable.subscribe((val: string) => $elem.text(val));
//
//     return observable;
// }
//
// const myElem = observeHtml('.test');
//
// console.log(myElem);
//
// myElem.value = 'Hey';
