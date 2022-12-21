import { ModelOption } from "../utils";
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

  private handleChangeOptions = (options: ModelOption) => {
    this.model.changeOptions(options);
  };

  // private handleUpdate(options: ModelOption) {
  //   this.model.changeOptions(options);
  // }

  // private model: Model;
  //
  // private view: View;
  //
  // constructor(
  //   private selector: string,
  //   private options?: Partial<ModelOption>
  // ) {
  //   super();
  //   this.model = new Model(options);
  //   this.view = new View(selector, this.model.optionsState);
  //   this.init();
  // }
  //
  // private init() {
  //   this.view.render();
  //   $(document).on("click", () => console.log(this.view.opts.from));
  // }
}

export default Controller;
