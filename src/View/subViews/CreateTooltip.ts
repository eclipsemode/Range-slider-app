class CreateTooltip {
  public tooltipElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createTooltip(parent);
  }

  private createTooltip(parent: JQuery): void {
    this.tooltipElement = $("<div>", {
      class: "slider-app__tooltip",
      text: "100",
    });

    this.tooltipElement.prependTo(parent);
  }
}

export default CreateTooltip;
