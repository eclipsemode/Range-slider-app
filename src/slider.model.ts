class Model {
    public static slider: JQuery<HTMLElement> = $(`
        <div class="slider-app">
            <span class="slider-app__rulers"></span>
            <span class="slider-app__bar">
                <span class="slider-app__fill"></span>
            </span>
            <input class="slider-app__input" type="range" min="0" max="100" value="50" step="10">
        </div>
    `);
}

export {Model};