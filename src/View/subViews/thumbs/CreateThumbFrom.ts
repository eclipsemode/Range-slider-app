import $ from "jquery";

class CreateThumbFrom {
  public fromThumbElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createFromThumb(parent);
  }

  private createFromThumb(parent: JQuery): void {
    this.fromThumbElement = $("<div>", {
      class: "slider-app__thumb slider-app__thumb-from",
    });
    this.fromThumbElement.appendTo(parent);
  }
}

export default CreateThumbFrom;
