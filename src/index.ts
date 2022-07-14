import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    from: 150,
    configPanel: true,
    percent: false,
    min: -100,
    max: 1000,
    rulers: false
});
