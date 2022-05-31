class MainClass {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    public getMainClass() {
        return $('<div>', {
            class: 'slider-app'
        }).appendTo(`${this.selector}`);
    }
}

export default MainClass;