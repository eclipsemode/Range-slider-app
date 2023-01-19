import { CreateBar, CreateTooltip } from "../index";
import { convertToPixel, ModelOption } from "../../../utils";

class RenderTooltip {
  public tooltipFrom: CreateTooltip;

  public tooltipTo: CreateTooltip;

  constructor(
    private options: ModelOption,
    tooltipFrom: CreateTooltip,
    tooltipTo: CreateTooltip,
    private bar: CreateBar
  ) {
    this.tooltipFrom = tooltipFrom;
    this.tooltipTo = tooltipTo;
    this.createElement();
    this.setProps();
  }

  private createElement() {
    if (this.options.tooltip) {
      if (!this.tooltipFrom) {
        this.tooltipFrom = new CreateTooltip(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.tooltipFrom.tooltipElement.addClass(
          "slider-app__tooltip--vertical"
        );
      } else if (this.tooltipFrom) {
        this.tooltipFrom.tooltipElement.removeClass(
          "slider-app__tooltip--vertical"
        );
      }
    }
  }

  private setProps() {
    if (this.options.tooltip) {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();
      const offsetFromThumb: number = convertToPixel(
        this.options.from,
        this.options.vertical ? sliderHeight : sliderWidth,
        this.options.min,
        this.options.max
      );

      this.tooltipFrom.tooltipElement.css({
        left: this.options.vertical ? "auto" : `${offsetFromThumb}px`,
        bottom: this.options.vertical ? `${offsetFromThumb}px` : "2.2em",
      });
      this.tooltipFrom.tooltipElement.text(this.options.from);

      if (this.options.range) {
        if (!this.tooltipTo) {
          this.tooltipTo = new CreateTooltip(this.bar.barElement);
        }

        if (this.options.vertical) {
          this.tooltipTo.tooltipElement.addClass(
            "slider-app__tooltip--vertical"
          );
        } else {
          this.tooltipTo.tooltipElement.removeClass(
            "slider-app__tooltip--vertical"
          );
        }
        const offsetToThumb: number = convertToPixel(
          this.options.to,
          this.options.vertical ? sliderHeight : sliderWidth,
          this.options.min,
          this.options.max
        );

        this.tooltipTo.tooltipElement.css({
          left: this.options.vertical ? "auto" : `${offsetToThumb}px`,
          bottom: this.options.vertical ? `${offsetToThumb}px` : "2.2em",
        });
        this.tooltipTo.tooltipElement.text(this.options.to);

        const tooltipFromWidth: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("width")
        );
        const tooltipFromHeight: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("height")
        );
        const tooltipToWidth: number = parseFloat(
          this.tooltipTo.tooltipElement.css("width")
        );
        const tooltipToHeight: number = parseFloat(
          this.tooltipTo.tooltipElement.css("height")
        );

        const tooltipFromLeft: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("left")
        );
        const tooltipFromBottom: number = parseFloat(
          this.tooltipFrom.tooltipElement.css("bottom")
        );

        const tooltipToLeft: number = parseFloat(
          this.tooltipTo.tooltipElement.css("left")
        );
        const tooltipToBottom: number = parseFloat(
          this.tooltipTo.tooltipElement.css("bottom")
        );

        if (this.options.vertical) {
          if (
            tooltipToBottom - tooltipFromBottom <=
            Math.max(tooltipFromHeight, tooltipToHeight)
          ) {
            this.tooltipTo.tooltipElement.remove();
            this.tooltipTo = null;
            this.tooltipFrom.tooltipElement.addClass(
              "slider-app__tooltip--merged"
            );

            const newBottomCss: number =
              (tooltipToBottom - tooltipFromBottom) / 2;

            this.tooltipFrom.tooltipElement.text(
              `${this.options.from} - ${this.options.to}`
            );

            this.tooltipFrom.tooltipElement.css({
              bottom: `${tooltipFromBottom + newBottomCss}px`,
            });
          } else {
            this.tooltipFrom.tooltipElement.removeClass(
              "slider-app__tooltip--merged"
            );
          }
        } else if (
          tooltipToLeft - tooltipFromLeft <=
          Math.max(tooltipFromWidth, tooltipToWidth)
        ) {
          this.tooltipTo.tooltipElement.remove();
          this.tooltipTo = null;
          this.tooltipFrom.tooltipElement.addClass(
            "slider-app__tooltip--merged"
          );

          const newLeftCss: number = (tooltipToLeft - tooltipFromLeft) / 2;

          this.tooltipFrom.tooltipElement.text(
            `${this.options.from} - ${this.options.to}`
          );

          this.tooltipFrom.tooltipElement.css({
            left: `${tooltipFromLeft + newLeftCss}px`,
          });
        } else {
          this.tooltipFrom.tooltipElement.removeClass(
            "slider-app__tooltip--merged"
          );
        }
      } else if (this.tooltipTo) {
        this.tooltipTo.tooltipElement.remove();
        this.tooltipTo = null;
      }
    } else {
      if (this.tooltipFrom) {
        this.tooltipFrom.tooltipElement.remove();
        this.tooltipFrom = null;
      }

      if (this.tooltipTo) {
        this.tooltipTo.tooltipElement.remove();
        this.tooltipTo = null;
      }

      this.bar.barElement.css("margin-top", "auto");
    }
  }
}

export default RenderTooltip;
