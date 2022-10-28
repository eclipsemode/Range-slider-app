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
const bar: JQuery = $('.slider-app__line');

thumbMin.on('mousedown', (e) => {
    const sliderWidth: number = e.target.parentElement.offsetWidth;

    thumbMin.on('dragstart', () => false);

    function moveAt(e: MouseMoveEvent | MouseDownEvent) {
        const min: number = bar.offset().left;
        const max: number = bar.offset().left + sliderWidth;

        let percent: number = (e.pageX - min) / sliderWidth * 100;

        if (e.pageX <= max && e.pageX >= min) {
            percent = (e.pageX - min) / sliderWidth * 100;
        } else if (e.pageX >= max) {
            percent = 100;
        } else if (e.pageX <= min) {
            percent = 0;
        }
        thumbMin.css('left', percent + '%');
        thumbMin.attr('data-value', percent + '%');
    }

    moveAt(e);

    $(document).on('mousemove', e => moveAt(e));

    thumbMin.on('mouseup', () => {
        $(document).off('mousemove');
        thumbMin.off('mouseup');
    });
});
