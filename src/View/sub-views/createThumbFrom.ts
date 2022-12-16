import $ from "jquery";

class CreateThumbFrom {
  public fromThumbElement: JQuery;

  constructor(private readonly root: JQuery) {
    this.createFromThumb(root);
  }

  private createFromThumb(root: JQuery): void {
    this.fromThumbElement = $("<div>", {
      class: "slider-app__thumb slider-app__thumb-from",
    });
    this.fromThumbElement.appendTo(root);

    // this.toThumb = $("<div>", {
    //   class: "slider-app__thumb slider-app__thumb-to",
    // });
    // this.toThumb.appendTo(root);
  }
}

export default CreateThumbFrom;
