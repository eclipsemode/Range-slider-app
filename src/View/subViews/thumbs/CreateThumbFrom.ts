import $ from "jquery";

class CreateThumbFrom {
  public fromThumbElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createFromThumb();
  }

  private createFromThumb(): void {
    this.fromThumbElement = $("<div>", {
      class: "slider-app__thumb slider-app__thumb-from",
    });
    this.fromThumbElement.appendTo(this.parent);
  }
}

export default CreateThumbFrom;
