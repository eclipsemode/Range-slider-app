import $ from "jquery";

class CreateThumbTo {
  public toThumbElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createToThumb();
  }

  private createToThumb(): void {
    this.toThumbElement = $("<div>", {
      class: "slider-app__thumb slider-app__thumb-to",
    });
    this.toThumbElement.appendTo(this.parent);
  }
}

export default CreateThumbTo;
