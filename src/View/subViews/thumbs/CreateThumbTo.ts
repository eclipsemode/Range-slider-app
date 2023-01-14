import $ from "jquery";

class CreateThumbTo {
  public toThumbElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createToThumb(parent);
  }

  private createToThumb(parent: JQuery): void {
    this.toThumbElement = $("<div>", {
      class: "slider-app__thumb slider-app__thumb-to",
    });
    this.toThumbElement.appendTo(parent);
  }
}

export default CreateThumbTo;
