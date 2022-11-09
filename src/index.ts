import './assets/style/style.scss';
import MouseMoveEvent = JQuery.MouseMoveEvent;
import MouseDownEvent = JQuery.MouseDownEvent;
import { Slider } from './Controller/slider.controller';
import $ from 'jquery';

new Slider('.slider', {
    configPanel: true,
    tooltip: true,
    range: false,
    min: -1000
});