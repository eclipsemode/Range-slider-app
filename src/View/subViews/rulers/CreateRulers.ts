class CreateRulers {
  public rulersElement: JQuery;

  constructor(
    parent: JQuery,
    valuesArr: number[],
    pixelsArr: number[],
    vertical: boolean
  ) {
    this.createRulers(parent, valuesArr, pixelsArr, vertical);
  }

  private createRulers(
    parent: JQuery,
    valuesArr: number[],
    pixelArr: number[],
    vertical: boolean
  ) {
    this.rulersElement = $("<div>", {
      class: "slider-app__rulers",
    });

    for (let i = 0; i < valuesArr.length; i++) {
      this.rulersElement.append(
        $("<div>", {
          class: `slider-app__rulers-value slider-app__rulers-value--${pixelArr[i]}`,
          text: valuesArr[i],
          css: {
            left: vertical ? "auto" : `${pixelArr[i]}px`,
            bottom: vertical ? `${pixelArr[i]}px` : "auto",
          },
        })
      );
    }

    this.rulersElement.appendTo(parent);
  }
}

export default CreateRulers;
