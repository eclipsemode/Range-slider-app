import {
  CreateBar,
  CreateProgress,
  CreateThumbFrom,
  CreateThumbTo,
} from "../index";
import { convertToPixel, ModelOption } from "../../../utils";

class RenderThumbs {
  public fromThumb: CreateThumbFrom;

  public toThumb: CreateThumbTo;

  constructor(
    private options: ModelOption,
    fromThumb: CreateThumbFrom,
    toThumb: CreateThumbTo,
    private bar: CreateBar,
    private progress: CreateProgress
  ) {
    this.fromThumb = fromThumb;
    this.toThumb = toThumb;
    this.createElement();
    this.setProps();
  }

  private createElement() {
    if (this.options.range) {
      if (!this.toThumb) {
        this.toThumb = new CreateThumbTo(this.bar.barElement);
      }

      if (!this.fromThumb) {
        this.fromThumb = new CreateThumbFrom(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.fromThumb.fromThumbElement.addClass("slider-app__thumb--vertical");
        this.toThumb.toThumbElement.addClass("slider-app__thumb--vertical");
      } else {
        this.toThumb.toThumbElement.removeClass("slider-app__thumb--vertical");
        this.fromThumb.fromThumbElement.removeClass(
          "slider-app__thumb--vertical"
        );
      }
    } else {
      const sliderWidth: number = this.bar.barElement.innerWidth();
      const sliderHeight: number = this.bar.barElement.innerHeight();

      if (!this.fromThumb) {
        this.fromThumb = new CreateThumbFrom(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.fromThumb.fromThumbElement.addClass("slider-app__thumb--vertical");
      } else {
        this.fromThumb.fromThumbElement.removeClass(
          "slider-app__thumb--vertical"
        );
      }

      if (this.toThumb) {
        this.toThumb.toThumbElement.remove();
        this.toThumb = null;
      }

      if (!this.options.vertical) {
        this.fromThumb.fromThumbElement.css({
          bottom: "auto",
          left: `${convertToPixel(
            this.options.from,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`,
        });

        if (this.progress?.progressElement) {
          this.progress.progressElement.css({
            height: "100%",
            width: `${convertToPixel(
              this.options.from,
              sliderWidth,
              this.options.min,
              this.options.max
            )}px`,
          });
        }
      } else {
        this.fromThumb.fromThumbElement.css({
          left: "-0.85em",
          bottom: `${convertToPixel(
            this.options.from,
            sliderHeight,
            this.options.min,
            this.options.max
          )}px`,
        });

        if (this.progress?.progressElement) {
          this.progress.progressElement.css({
            width: "100%",
            bottom: "0",
            height: `${convertToPixel(
              this.options.from,
              sliderHeight,
              this.options.min,
              this.options.max
            )}px`,
          });
        }
      }
    }
  }

  private setProps() {
    const sliderWidth: number = this.bar.barElement.innerWidth();
    const sliderHeight: number = this.bar.barElement.innerHeight();
    this.fromThumb.fromThumbElement.css({
      bottom: this.options.vertical
        ? `${convertToPixel(
            this.options.from,
            sliderHeight,
            this.options.min,
            this.options.max
          )}px`
        : "auto",
      left: this.options.vertical
        ? "-0.85em"
        : `${convertToPixel(
            this.options.from,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`,
    });

    this.toThumb?.toThumbElement.css({
      bottom: this.options.vertical
        ? `${convertToPixel(
            this.options.to,
            sliderHeight,
            this.options.min,
            this.options.max
          )}px`
        : "auto",
      left: this.options.vertical
        ? "-0.85em"
        : `${convertToPixel(
            this.options.to,
            sliderWidth,
            this.options.min,
            this.options.max
          )}px`,
    });

    if (this.options.progress) {
      this.progress.progressElement.css({
        left: this.options.vertical
          ? "auto"
          : `${convertToPixel(
              this.options.from,
              sliderWidth,
              this.options.min,
              this.options.max
            )}px`,
        bottom: this.options.vertical
          ? `${convertToPixel(
              this.options.from,
              sliderHeight,
              this.options.min,
              this.options.max
            )}px`
          : "auto",
        width: this.options.vertical
          ? "100%"
          : `${
              convertToPixel(
                this.options.to,
                sliderWidth,
                this.options.min,
                this.options.max
              ) -
              convertToPixel(
                this.options.from,
                sliderWidth,
                this.options.min,
                this.options.max
              )
            }px`,
        height: this.options.vertical
          ? `${
              convertToPixel(
                this.options.to,
                sliderHeight,
                this.options.min,
                this.options.max
              ) -
              convertToPixel(
                this.options.from,
                sliderHeight,
                this.options.min,
                this.options.max
              )
            }px`
          : "100%",
      });
    }
  }
}

export default RenderThumbs;
