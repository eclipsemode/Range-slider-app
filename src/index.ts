import './assets/style/style.scss';
import {default as SliderRange} from './slider.view';

new SliderRange('.slider', {
    value: 100,
    width: 200,
});

new SliderRange('.second', {
    value: 20,
});

