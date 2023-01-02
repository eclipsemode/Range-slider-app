import { ActionEnum, ModelOption } from "../utils";
import View from "../View";
import Model from "../Model";

class Controller {
  private readonly model: Model;

  private readonly view: View;

  constructor(
    private readonly selector: string,
    private readonly options: Partial<ModelOption>
  ) {
    this.model = new Model(options);
    this.view = new View(selector);

    this.model.bindOptionsChanged(this.onOptionsChanged);
    this.view.bindChangeOptions(this.handleChangeOptions);

    this.onOptionsChanged(this.model.options);
  }

  public onOptionsChanged = (options: ModelOption) => {
    this.view.render(options);
  };

  private handleChangeOptions = (options: ModelOption, action?: ActionEnum) => {
    this.model.changeOptions(options, action);
  };
}

export default Controller;
