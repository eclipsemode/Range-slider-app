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
    const sliderWidth: number = e.target.parentElement.offsetWidth;

    thumbMin.on('dragstart', () => false);

    function moveAt(e: MouseMoveEvent | MouseDownEvent) {
        // const percent: number = parseInt(
        //     String((e.pageX - thumbMin.width() / 2 - thumbMin.width()) / sliderWidth * 100));
        // if (e.pageX > 530) {
        //     percent = 100;
        // }
        // if (percent <= 100 && percent >= 0) {
        //     thumbMin.css('left', percent + '%');
        //     thumbMin.attr('data-value', percent + '%');
        // }
        console.log(e.offsetX);
        const percent: number = e.offsetX / sliderWidth * 100;
        if (e.offsetX <= 500 && e.offsetX >= 0) {
            thumbMin.css('left', percent + '%');
            thumbMin.attr('data-value', percent + '%');
        }
    }

    moveAt(e);

    $(document).on('mousemove', e => moveAt(e));

    thumbMin.on('mouseup', () => {
        $(document).off('mousemove');
        thumbMin.off('mouseup');
    });
});
