function progressCalc(e: JQuery.MouseEventBase, sliderWidth: number, bar: JQuery): number {
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

export default progressCalc;