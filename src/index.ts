import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 180,
    rulersHidden: true,
    tooltip: true,
    width: 300,
    max: 900,
});

new SliderRange('.second', {
    value: 200,
    step: 1,
    tooltip: true,
    max: 10000,
    min: -10000,
    width: 1000,
    percent: true
});