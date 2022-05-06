class Controller {
    private static setBar(): void {
        const $slider = $('.slider-app__input');
        const $fill = $('.slider-app__bar .slider-app__fill');

        const min: number = parseInt($slider.attr('min'));
        const max: number = parseInt($slider.attr('max'));
        const value: number = <number>$slider.val();
        const percent: number = ((value - min) / (max - min)) * 100;

        $fill.css('height', percent + '%');
        this.setRGB(percent);
    }

    private static setRGB(percent: number): void {
        const rgb1: number[] = [255, 229, 59];
        const rgb2: number[] = [255, 37, 37];

        const R: number = this.calcPercent(rgb1[0], rgb2[0], percent);
        const G: number = this.calcPercent(rgb1[1], rgb2[1], percent);
        const B: number = this.calcPercent(rgb1[2], rgb2[2], percent);

        $('.slider-app .slider-app__input::-webkit-slider-thumb').css(
            'background-color', 'rgba('+R+','+G+','+B+');');
    }

    private static calcPercent(s: number, e: number, p: number) {
        return (e - s) * (p / 100) + s;
    }

    public static getSlider() {
        this.setBar();
        $('.slider-app__input').on('input', () => {
            Controller.setBar();
        });
    }
}

export {Controller};