import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    configPanel: true,
    percent: false,
    rulers: false,
    tooltip: true,
    range: true,
});