import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    tooltip: {
        display: true,
        percent: true
    },
    range: true,
    configPanel: true
});

new Controller('.second', {
    min: -10000,
    max: 500,
});

// const observer = new Observable();
//
// const fn = (count: any) => {
//     $('.text').text(count);
// };
//
// const nt = (ht: any) => {
//     console.log('Hello');
// };
//
// observer.subscribe(fn);
// observer.subscribe(nt);
//
// $('.inp-plus').on('click', () => {
//     observer.broadcast( parseInt($('.text').text()) + 1);
// });
// $('.inp-minus').on('click', () => {
//     observer.broadcast( parseInt($('.text').text()) - 1);
// });

// function expect(value: number): any {
//     return {
//         toBe: (exp: number) => {
//             if (value === exp) {
//                 console.log('Success');
//             } else {
//                 console.error(`Value is ${value}, but expectation is ${exp}`);
//             }
//         }
//     };
// }



