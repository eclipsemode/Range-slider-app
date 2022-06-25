import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    from: 150,
    configPanel: true,
    percent: false,
    max: 1000,
    gap: 0,
    rulers: false
});

// new Controller('.second', {
//     min: -10000,
//     max: 500,
//     configPanel: true
// });
