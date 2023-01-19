class CreateTooltip {
  public tooltipElement: JQuery;

  constructor(private readonly parent: JQuery) {
    this.createTooltip();
  }

  private createTooltip(): void {
    this.tooltipElement = $("<div>", {
      class: "slider-app__tooltip",
    });

    this.tooltipElement.prependTo(this.parent);
  }
}

export default CreateTooltip;
