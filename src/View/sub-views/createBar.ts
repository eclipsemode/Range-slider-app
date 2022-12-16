class CreateBar {
  private bar: JQuery;

  constructor(root: JQuery) {
    this.createBar(root);
  }

  get getBar() {
    return this.bar;
  }

  private createBar(root: JQuery): void {
    this.bar = $("<div>", {
      class: "slider-app__bar",
    });
    this.bar.appendTo(root);
  }
}

export default CreateBar;
