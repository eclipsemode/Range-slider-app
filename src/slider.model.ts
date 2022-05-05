class Model {
    static slider = $(`
        <div class="slider-container">
            <span class="slider__rulers"></span>
            <span class="slider__bar">
                <span class="slider__fill"></span>
            </span>
            <input class="slider__input" type="range" min="0" max="100" value="50" step="10">
        </div>
    `);
}

export {Model}