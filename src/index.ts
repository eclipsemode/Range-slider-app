import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 400,
    rulersHidden: true,
    tooltip: true,
    length: 300,
    min: 0,
    max: 1000,
    step: 100,
    color: {
        secondColor: 'green'
    }
});

new SliderRange('.second', {
    value: 200,
    step: 1,
    tooltip: true,
    max: 100000,
    min: -10000,
    length: 500,
    percent: true,
    color: {
        textColor: 'blue',
        thumbColor: 'red'

    }
});