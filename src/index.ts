import './assets/style/style.scss';
import MouseMoveEvent = JQuery.MouseMoveEvent;
import MouseDownEvent = JQuery.MouseDownEvent;
// import { Slider } from './Controller/slider.controller';

// new Slider('.slider', {
//     configPanel: true,
//     tooltip: true,
//     range: false,
//     min: -1000
// });

const thumbMin: JQuery = $('.slider-app__thumb-min');

thumbMin.on('mousedown', (e) => {

    thumbMin.on('dragstart', () => false);
    function moveAt(e: MouseMoveEvent | MouseDownEvent) {
        thumbMin.css('left', e.pageX - thumbMin.width() + '%');
    }

    moveAt(e);

    $(document).on('mousemove', (e) => {
        moveAt(e);
    });

    thumbMin.on('mouseup', () => {
        $(document).off('mousemove');
        thumbMin.off('mouseup');
    });
});
