import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 180,
    rulersHidden: true,
    tooltip: true,
    width: 300,
    max: 900,
    percent: true
});

new SliderRange('.second', {
    value: 200,
    step: 20,
    tooltip: true,
    max: 300,
    min: 100,

});