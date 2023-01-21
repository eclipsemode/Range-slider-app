import $ from "jquery";

class CreateRulers {
  public rulersElement: JQuery;

  constructor(
    private readonly parent: JQuery,
    private readonly valuesArr: number[],
    private readonly pixelsArr: number[],
    private readonly vertical: boolean
  ) {
    this.createRulers();
  }

  private createRulers() {
    this.rulersElement = $("<div>", {
      class: "slider-app__rulers",
    });

    for (let i = 0; i < this.valuesArr.length; i++) {
      this.rulersElement.append(
        $("<div>", {
          class: `slider-app__rulers-value slider-app__rulers-value--${this.pixelsArr[i]}`,
          text: this.valuesArr[i],
          css: {
            left: this.vertical ? "auto" : `${this.pixelsArr[i]}px`,
            bottom: this.vertical ? `${this.pixelsArr[i]}px` : "auto",
          },
        })
      );
    }

    this.rulersElement.appendTo(this.parent);
  }
}

export default CreateRulers;
