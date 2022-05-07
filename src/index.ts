import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 100,
    width: 200,
    rulersHidden: true,
    tooltip: true
});

new SliderRange('.second', {
    value: 20,
    step: 20
});