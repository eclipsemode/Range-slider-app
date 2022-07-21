import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    configPanel: true,
    percent: false,
    min: -10000,
    max: 10000,
    rulers: false
});
