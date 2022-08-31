import './assets/style/style.scss';
import {Slider} from './Controller/slider.controller';

new Slider('.slider', {
    configPanel: true,
    tooltip: true,
    range: true,
    step: 200
});