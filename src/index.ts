import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    tooltip: true,
    color: {
        firstColor: 'blue'
    },
});

new SliderRange('.second', {
    value: 200,
    step: 1,
    tooltip: true,
    max: 100000,
    min: -10000,
    color: {
        textColor: 'blue',
        thumbColor: 'red'

    }
});