class Progress {

    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    public getProgress() {
        return $('<div>', {
            class: 'slider-app__progress'
        }).appendTo(`${this.selector} .slider-app__bar-line`);
    }

}

export default Progress;