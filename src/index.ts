import './assets/style/style.scss';
import { Slider } from './Controller/slider.controller';

new Slider('.slider', {
    configPanel: true,
    tooltip: true,
    // range: false,
    min: -1000
});

// new Slider('.slider2');