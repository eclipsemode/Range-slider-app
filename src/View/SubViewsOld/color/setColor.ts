import $ from "jquery";
import { ClassName } from "../../../utils";

function setColor(): void {
  const isColorAdded: string =
    this.opts.color.firstColor || this.opts.color.secondColor;
  const isTextColorAdded: string = this.opts.color.textColor;
  const isThumbColorAdded: string = this.opts.color.thumbColor;
  const $values: JQuery = $(`${this.selectorState} ${ClassName.RULERS_VALUES}`);

  if (isColorAdded) {
    const colorOne: string = this.opts.color.firstColor;
    const colorTwo: string = this.opts.color.secondColor;
    const $progress: JQuery = $(`${this.selectorState} ${ClassName.PROGRESS}`);

    $progress.css(
      "background-image",
      `linear-gradient(90deg, ${colorOne} 0%, ${colorTwo} 100%)`
    );
  }

  if (isTextColorAdded) {
    $values.css("color", this.opts.color.textColor);
    $(`${this.selectorState} .js-slider-app__config-text--inner`).css(
      "color",
      this.opts.color.textColor
    );

    $(`${this.selectorState} .js-slider-app__config-toggle-name`).css(
      "color",
      this.opts.color.textColor
    );

    // noinspection HtmlDeprecatedAttribute
    $(`<style type="text/css">${this.opts} .js-slider-app__config-toggle-btn::before
                {background-color: ${this.opts.color.textColor}}</style>`).appendTo(
      $("head")
    );
  }

  if (isThumbColorAdded) {
    // noinspection HtmlDeprecatedAttribute
    $(`<style type="text/css">${this.selectorState} .js-slider-app__input::-webkit-slider-thumb
                {background-color: ${this.opts.color.thumbColor}}</style>`).appendTo(
      $("head")
    );
  }
}

export default setColor;
