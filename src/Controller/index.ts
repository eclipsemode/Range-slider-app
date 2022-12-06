import { ModelOption } from "../utils";

import View from "../View";
import Model from "../Model";
import Observer from "../Observer/Observer";

class Controller extends Observer {
  private model: Model;

  private view: View;

  constructor(
    private selector: string,
    private options?: Partial<ModelOption>
  ) {
    super();
    this.model = new Model(options);
    this.view = new View(selector, this.model.optionsState);
    this.init();
  }

  init() {
    this.view.render();
  }
}

export { Controller as Slider };
