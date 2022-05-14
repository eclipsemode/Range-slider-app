import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    tooltip: {
        display: true,
        percent: true
    }
});

new Controller('.second', {
    tooltip: {
        display: true
    },
    color: {
        thumbColor: 'green',
        secondColor: 'blue'
    }
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