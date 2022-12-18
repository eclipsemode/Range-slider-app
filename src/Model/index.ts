import { ModelOption, TogglesEnum, ControlsEnum } from "../utils";

class Model {
  public options: ModelOption;

  private onOptionsChanged: (options: ModelOption) => void;

  constructor(private optionsReceived?: Partial<ModelOption>) {
    this.options = this.checkOptions(optionsReceived);
  }

  private checkOptions(options: Partial<ModelOption>): ModelOption {
    const verifiedOptions = { ...options };
    verifiedOptions.min = verifiedOptions.min ?? 0;
    verifiedOptions.max = verifiedOptions.max ?? 1000;
    verifiedOptions.from = verifiedOptions.from ?? verifiedOptions.min;
    verifiedOptions.to = verifiedOptions.to ?? verifiedOptions.max;
    verifiedOptions.gap =
      verifiedOptions.gap ??
      ((verifiedOptions.max - verifiedOptions.min) * 10) / 100;
    verifiedOptions.step = verifiedOptions.step ?? 1;
    verifiedOptions.vertical = verifiedOptions.vertical ?? false;
    verifiedOptions.rulers = verifiedOptions.rulers ?? true;
    verifiedOptions.tooltip = verifiedOptions.tooltip ?? false;
    verifiedOptions.percent = verifiedOptions.percent ?? false;
    verifiedOptions.color = verifiedOptions.color ?? {
      firstColor: "#ffe53b",
      secondColor: "#ff2525",
      textColor: "#ffe53b",
      thumbColor: "#ffe53b",
    };
    verifiedOptions.color.firstColor =
      verifiedOptions.color.firstColor ?? "#ffe53b";
    verifiedOptions.color.secondColor =
      verifiedOptions.color.secondColor ?? "#ff2525";
    verifiedOptions.color.textColor =
      verifiedOptions.color.textColor ?? "#ffe53b";
    verifiedOptions.color.thumbColor =
      verifiedOptions.color.thumbColor ?? "#ffe53b";
    verifiedOptions.range = verifiedOptions.range ?? false;
    verifiedOptions.configPanel = verifiedOptions.configPanel ?? false;
    verifiedOptions.progress = verifiedOptions.progress ?? true;
    verifiedOptions.controlConfig = Object.values(ControlsEnum);
    verifiedOptions.toggleConfig = Object.values(TogglesEnum);

    verifiedOptions.min =
      verifiedOptions.min < verifiedOptions.max
        ? verifiedOptions.min
        : verifiedOptions.max;

    if (verifiedOptions.from < verifiedOptions.min) {
      verifiedOptions.from = verifiedOptions.min;
    } else if (verifiedOptions.from > verifiedOptions.max) {
      verifiedOptions.from = verifiedOptions.max;
    }

    return verifiedOptions as ModelOption;
  }

  public changeOptions(options: ModelOption) {
    this.options = this.checkOptions(options);
    this.commitOptions(this.options);
  }

  private commitOptions(options: ModelOption) {
    this.onOptionsChanged(options);
  }

  public bindOptionsChanged(callback: (options: ModelOption) => void) {
    this.onOptionsChanged = callback;
  }
}

export default Model;
