class Rulers {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    public getRulers() {
        return $('<div>', {
            class: 'slider-app__rulers'
        }).prependTo(`${this.selector} .slider-app`);
    }
}

export default Rulers;