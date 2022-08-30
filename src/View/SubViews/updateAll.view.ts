function updateAll(): void {
    $(`${ this.selectorState } .js-slider-app__input-min`).val(this.opts.from);
    $(`${ this.selectorState } .js-slider-app__input-max`).val(this.opts.to);
}

export default updateAll;