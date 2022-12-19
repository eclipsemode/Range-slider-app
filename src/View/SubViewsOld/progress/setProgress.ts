import $ from "jquery";
import CreateProgress from "./CreateProgress";

import { ClassName } from "../../../utils";

function setProgress(): void {
  const progress: CreateProgress = new CreateProgress(this.selectorState);
  const isProgressTrue: boolean = this.opts.progress;

  if (isProgressTrue) {
    $(`${this.selectorState} ${ClassName.PROGRESS}`).length === 0
      ? progress.getProgress()
      : null;
  } else $(`${this.selectorState} ${ClassName.PROGRESS}`).remove();
}

export default setProgress;
