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

function barCalc(e: JQuery.MouseEventBase, sliderWidth: number) {
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
    return percent;
}

thumbMin.on('mousedown', (e) => {
    const sliderWidth: number = e.target.parentElement.offsetWidth;

    thumbMin.on('dragstart', () => false);

    function moveAt(e: MouseMoveEvent | MouseDownEvent) {
        thumbMin.css('left', Math.ceil(barCalc(e, sliderWidth)) + '%');
        thumbMin.attr('data-value', Math.ceil(barCalc(e, sliderWidth)) + '%');
    }

    moveAt(e);

    $(document).on('mousemove', e => moveAt(e));

    thumbMin.on('mouseleave', () => {
        $(document).on('mouseup', () => {
            $(document).off('mousemove');
            $(document).off('mouseup');
            thumbMin.off('mouseleave');
        });
    });
    thumbMin.on('mouseup', () => {
        $(document).off('mousemove');
        thumbMin.off('mouseup');
    });
});

function barLine() {
    const $bar = $('.slider-app__fill');
    thumbMin.on('mousedown', (e) => {
        const sliderWidth: number = e.target.parentElement.offsetWidth;
        $(document).on('mousemove', (e) => {
            $bar.css('width', Math.ceil(barCalc(e, sliderWidth)) + '%');
        });
    });
}

barLine();