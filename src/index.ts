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
        const percent: string = (e.pageX - thumbMin.width() / 2 - 13) / 500 * 100 + '%';
        if (parseInt(percent) <= 100 && parseInt(percent) >=0) {
            thumbMin.css('left', percent);
        }
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
