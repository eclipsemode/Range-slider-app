class Controller {

    public static setBar(): void {
        const $slider = $('.slider__input');
        const $fill = $('.slider__bar .slider__fill');

        const min: number = parseInt($slider.attr('min'));
        const max: number = parseInt($slider.attr('max'));
        const value: number = <number>$slider.val();
        const percent: number = ((value - min) / (max - min)) * 100;

        $fill.css('height', percent + '%');
        this.setRGB(percent);
    }

    private static setRGB(percent: number) {
        const rgb1: number[] = [255, 229, 59];
        const rgb2: number[] = [255, 37, 37];

        const R = this.calcPercent(rgb1[0], rgb2[0], percent);
        const G = this.calcPercent(rgb1[1], rgb2[1], percent);
        const B = this.calcPercent(rgb1[2], rgb2[2], percent);

        $('.slider-container .slider__input::-webkit-slider-thumb').css(
            'background-color', 'rgba('+R+','+G+','+B+');');
    }

    private static calcPercent(s: number, e: number, p: number) {
        return (e - s) * (p / 100) + s;
    }

    static getSlider() {
        this.setBar();
        $('.slider__input').on('input', () => {
            Controller.setBar();
        });
    }
}

export {Controller}