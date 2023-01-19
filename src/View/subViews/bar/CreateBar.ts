import $ from "jquery";

class CreateBar {
  public barElement: JQuery;

  constructor(parent: JQuery) {
    this.createBar(parent);
  }

  private createBar(parent: JQuery): void {
    this.barElement = $("<div>", {
      class: "slider-app__bar",
    });
    this.barElement.appendTo(parent);
  }
}

export default CreateBar;
