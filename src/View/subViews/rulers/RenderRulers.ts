import $ from "jquery";
import { convertToNumber, convertToPixel, ModelOption } from "../../../utils";
import { CreateBar, CreateRulers } from "../index";

class RenderRulers {
  public rulers: CreateRulers;

  private valuesArr: number[] = [];

  private pixelsArr: number[] = [];

  constructor(
    private options: ModelOption,
    rulers: CreateRulers,
    private bar: CreateBar
  ) {
    this.rulers = rulers;
    this.setProps();
    this.createElement();
  }

  private createElement() {
    if (this.options.rulers) {
      this.rulers = new CreateRulers(
        this.bar.barElement,
        this.valuesArr,
        this.pixelsArr,
        this.options.vertical
      );

      if (this.options.vertical) {
        this.rulers.rulersElement.addClass("slider-app__rulers--vertical");
        this.rulers.rulersElement
          .children()
          .addClass("slider-app__rulers-value--vertical");
      } else if (this.rulers) {
        this.rulers.rulersElement.removeClass("slider-app__rulers--vertical");
        this.rulers.rulersElement
          .children()
          .removeClass("slider-app__rulers-value--vertical");
      }
    } else if (this.rulers) {
      this.rulers.rulersElement.remove();
      this.rulers = null;
    }
  }

  private setProps() {
    if (this.rulers) {
      this.rulers.rulersElement?.remove();
      this.rulers = null;
    }
    if (!this.rulers) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();
      const convertedStepToPixel: number = convertToPixel(
        this.options.step,
        this.options.vertical ? sliderHeight : sliderWidth,
        this.options.min,
        this.options.max
      );

      let gap = 87;

      if (convertedStepToPixel > gap) {
        gap = convertedStepToPixel;
      } else {
        gap = gap - (gap % convertedStepToPixel) + convertedStepToPixel;
      }
      const amountValues: number = this.options.vertical
        ? sliderHeight / gap
        : sliderWidth / gap;
      const gapValues: number = this.options.vertical
        ? sliderHeight / amountValues
        : sliderWidth / amountValues;

      if (this.options.vertical) {
        for (let i = 0; i < sliderHeight - gapValues; i += gapValues) {
          this.valuesArr.push(
            convertToNumber(i, sliderHeight, this.options.min, this.options.max)
          );
          this.pixelsArr.push(i);
        }
      } else {
        for (let i = 0; i < sliderWidth - gapValues; i += gapValues) {
          this.valuesArr.push(
            convertToNumber(i, sliderWidth, this.options.min, this.options.max)
          );
          this.pixelsArr.push(i);
        }
      }

      this.pixelsArr.push(this.options.vertical ? sliderHeight : sliderWidth);
      this.valuesArr.push(this.options.max);
    }
  }
}

export default RenderRulers;
