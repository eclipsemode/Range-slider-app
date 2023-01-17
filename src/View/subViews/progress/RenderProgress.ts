import { CreateBar, CreateProgress } from "../index";
import { ModelOption } from "../../../utils";

class RenderProgress {
  public progress: CreateProgress;

  constructor(
    private options: ModelOption,
    progress: CreateProgress,
    private bar: CreateBar
  ) {
    this.progress = progress;
    if (this.options.progress) {
      if (!this.progress) {
        this.progress = new CreateProgress(this.bar.barElement);
      }

      if (this.options.vertical) {
        this.progress.progressElement.addClass(
          "slider-app__progress--vertical"
        );
      } else if (this.progress) {
        this.progress.progressElement.removeClass(
          "slider-app__progress--vertical"
        );
      }

      if (!this.options.range) {
        this.progress.progressElement.css("left", "auto");
      }
    } else if (this.progress) {
      this.progress.progressElement.remove();
      this.progress = null;
    }
  }
}

export default RenderProgress;
