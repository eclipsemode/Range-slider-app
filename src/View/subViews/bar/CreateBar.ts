import $ from "jquery";

class CreateBar {
  public barElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createBar();
  }

  private createBar(): void {
    this.barElement = $("<div>", {
      class: "slider-app__bar",
    });
    this.barElement.appendTo(this.parent);
  }
}

export default CreateBar;
