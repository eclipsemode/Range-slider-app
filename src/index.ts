import './assets/style/style.scss';
import { Slider } from './Controller';

new Slider('.slider', {
    configPanel: true,
    tooltip: true,
    range: false,
    min: -1000
});