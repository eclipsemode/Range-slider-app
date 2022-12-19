import $ from "jquery";

class CreateProgress {
  public progressElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createProgress(parent);
  }

  private createProgress(parent: JQuery) {
    this.progressElement = $("<div>", {
      class: "slider-app__progress",
    });
    this.progressElement.prependTo(parent);
  }
}

export default CreateProgress;
