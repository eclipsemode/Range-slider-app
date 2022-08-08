import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    configPanel: true,
    percent: false,
    min: 1000,
    max: 28000,
    rulers: false,
    tooltip: true,
    range: true,
});