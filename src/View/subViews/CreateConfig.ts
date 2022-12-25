class CreateConfig {
  public configElement: JQuery;

  private toggleElement: JQuery;

  private controlElement: JQuery;

  constructor(private parent: JQuery, private readonly toggleConfig: string[]) {
    this.createToggles(parent, toggleConfig);
  }

  private createToggles(parent: JQuery, toggleConfig: string[]) {
    this.configElement = $("<div>", {
      class: "slider-app__config",
    });
    this.toggleElement = $("<div>", {
      class: "slider-app__config-toggle",
    });
    this.configElement.append(this.toggleElement);

    toggleConfig.forEach((name) => {
      const selectorByName = `slider-app__config--${name}`;

      this.toggleElement.append(
        $(`
                <div class="slider-app__config-element">
                    <label class="slider-app__config-name" for=${selectorByName}>${name}</label>
                    <label class="slider-app__config-container">
                        <input class='slider-app__config-toggle-box ${selectorByName}' type="checkbox">
                        <span class="slider-app__config-toggle-btn"></span>
                    </label>
                </div>
      `)
      );
    });
    this.configElement.appendTo(parent);
  }
}

export default CreateConfig;
