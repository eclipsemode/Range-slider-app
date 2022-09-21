import './assets/style/style.scss';
import { Slider } from './Controller/slider.controller';
// import Observ from './Observer/Observ';

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
//     const observable = new Observ(value);
//
//     observable.subscribe((val: any) => {
//         $elem.text(val);
//     });
//
//     return observable;
// }
//
// const myElem = observeHtml('.test');
//
// myElem.value = 'new content';
//
// myElem.value = 'ddd';