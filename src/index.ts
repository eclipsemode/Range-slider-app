import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 180,
    rulersHidden: true,
    tooltip: true,
    width: 300,
    max: 900
});

new SliderRange('.second', {
    value: 100,
    step: 20,
    tooltip: true
});