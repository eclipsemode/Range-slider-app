import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 180,
    rulersHidden: true,
    tooltip: true,
    length: 300,
    min: 120,
    max: 1000000,
    horizontal: false
});

new SliderRange('.second', {
    value: 200,
    step: 1,
    tooltip: true,
    max: 100000,
    min: -10000,
    length: 500,
    percent: true,
    horizontal: false
});