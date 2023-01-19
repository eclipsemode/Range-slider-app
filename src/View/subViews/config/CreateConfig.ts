class CreateConfig {
  public configElement: JQuery;

  private toggleElement: JQuery;

  private controlElement: JQuery;

  constructor(
    private parent: JQuery,
    private readonly toggleConfig: string[],
    private readonly controlConfig: string[]
  ) {
    this.createToggles();
  }

  private createToggles() {
    this.configElement = $("<div>", {
      class: "slider-app__config",
    });
    this.toggleElement = $("<div>", {
      class: "slider-app__toggle",
    });
    this.controlElement = $("<div>", {
      class: "slider-app__control",
    });
    this.configElement.append(this.toggleElement);
    this.configElement.prepend(this.controlElement);

    this.controlConfig.forEach((name) => {
      const selectorByName = `slider-app__control--${name}`;

      this.controlElement.append(
        $(
          `<div class="slider-app__control-element">
                    <div class="slider-app__control-name">
                        <span class="slider-app__control-name--inner">
                            ${name}
                        </span>
                    </div>
                    <input 
                    class="slider-app__control-input ${selectorByName}"
                    type="number" 
                    />
                </div>`
        )
      );
    });

    this.toggleConfig.forEach((name) => {
      const selectorByName = `slider-app__toggle--${name}`;

      this.toggleElement.append(
        $(`
                <div class="slider-app__toggle-element">
                    <label class="slider-app__toggle-name" for=${selectorByName}>${name}</label>
                    <label class="slider-app__toggle-container">
                        <input class='slider-app__toggle-box ${selectorByName}' type="checkbox">
                        <span class="slider-app__toggle-btn"></span>
                    </label>
                </div>
      `)
      );
    });
    this.configElement.appendTo(this.parent);
  }
}

export default CreateConfig;
