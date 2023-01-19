import $ from "jquery";

class CreateProgress {
  public progressElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createProgress();
  }

  private createProgress() {
    this.progressElement = $("<div>", {
      class: "slider-app__progress",
    });
    this.progressElement.prependTo(this.parent);
  }
}

export default CreateProgress;
