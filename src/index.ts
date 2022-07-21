import './assets/style/style.scss';
import Controller from './Controller/slider.controller';

new Controller('.slider', {
    configPanel: true,
    percent: false,
    max: 100000000,
    rulers: false
});
