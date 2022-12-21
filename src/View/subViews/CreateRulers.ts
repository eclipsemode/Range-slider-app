class CreateRulers {
  public rulersElement: JQuery;

  constructor(parent: JQuery, valuesArr: number[], pixelsArr: number[]) {
    this.createRulers(parent, valuesArr, pixelsArr);
  }

  private createRulers(
    parent: JQuery,
    valuesArr: number[],
    pixelArr: number[]
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
            left: `${pixelArr[i]}px`,
          },
        })
      );
    }

    this.rulersElement.appendTo(parent);
  }
}

export default CreateRulers;
