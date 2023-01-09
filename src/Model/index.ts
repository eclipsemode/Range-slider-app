import { ActionEnum, ControlsEnum, ModelOption, TogglesEnum } from "../utils";

class Model {
  public options: ModelOption;

  private onOptionsChanged: (options: ModelOption) => void;

  constructor(private optionsReceived?: Partial<ModelOption>) {
    this.options = this.checkOptions(optionsReceived);
  }

  private checkOptions(
    options: Partial<ModelOption>,
    action?: ActionEnum
  ): ModelOption {
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
    verifiedOptions.configPanel = verifiedOptions.configPanel ?? true;
    verifiedOptions.progress = verifiedOptions.progress ?? true;
    verifiedOptions.controlConfig = Object.values(ControlsEnum);
    verifiedOptions.toggleConfig = Object.values(TogglesEnum);

    verifiedOptions.min =
      verifiedOptions.min < verifiedOptions.max
        ? verifiedOptions.min
        : verifiedOptions.max;

    if (verifiedOptions.gap > verifiedOptions.max - verifiedOptions.min) {
      verifiedOptions.gap = verifiedOptions.max - verifiedOptions.min;
    }

    if (verifiedOptions.step > verifiedOptions.max - verifiedOptions.min) {
      verifiedOptions.step = verifiedOptions.max - verifiedOptions.min;
    }

    if (verifiedOptions.step < 1) {
      verifiedOptions.step = 1;
    } else if (
      verifiedOptions.step >
      verifiedOptions.max - verifiedOptions.min
    ) {
      verifiedOptions.step = verifiedOptions.max - verifiedOptions.min;
    }

    if (verifiedOptions.from % verifiedOptions.step !== 0) {
      const rest: number = verifiedOptions.from % verifiedOptions.step;
      const middle: number = verifiedOptions.step / 2;

      if (verifiedOptions.step - rest > middle) {
        verifiedOptions.from -= rest;
      } else {
        verifiedOptions.from =
          verifiedOptions.from + verifiedOptions.step - rest;
      }
    }

    if (verifiedOptions.from < verifiedOptions.min) {
      verifiedOptions.from = verifiedOptions.min;
    }
    if (verifiedOptions.from > verifiedOptions.max) {
      verifiedOptions.from =
        verifiedOptions.max - (verifiedOptions.max % verifiedOptions.step);
    }

    if (verifiedOptions.to % verifiedOptions.step !== 0) {
      const rest: number = verifiedOptions.to % verifiedOptions.step;
      const middle: number = verifiedOptions.step / 2;

      if (verifiedOptions.step - rest > middle) {
        verifiedOptions.to -= rest;
      } else {
        verifiedOptions.to = verifiedOptions.to + verifiedOptions.step - rest;
      }
    }

    if (verifiedOptions.to >= verifiedOptions.max) {
      verifiedOptions.to =
        verifiedOptions.max - (verifiedOptions.max % verifiedOptions.step);
    }

    if (action === ActionEnum.DRAG_FROM) {
      if (verifiedOptions.range) {
        if (verifiedOptions.from >= verifiedOptions.to - verifiedOptions.gap) {
          verifiedOptions.from =
            verifiedOptions.step >= verifiedOptions.gap
              ? verifiedOptions.to - verifiedOptions.step
              : verifiedOptions.to -
                verifiedOptions.gap -
                ((verifiedOptions.to - verifiedOptions.gap) %
                  verifiedOptions.step);
        }
      }
    }

    if (action === ActionEnum.DRAG_TO) {
      if (verifiedOptions.to <= verifiedOptions.from + verifiedOptions.gap) {
        verifiedOptions.to =
          verifiedOptions.step >= verifiedOptions.gap
            ? verifiedOptions.from + verifiedOptions.step
            : verifiedOptions.from +
              verifiedOptions.gap -
              (((verifiedOptions.from + verifiedOptions.gap) %
                verifiedOptions.step) -
                verifiedOptions.step);
      }
    }

    if (action === ActionEnum.CONFIG_RANGE) {
      if (
        verifiedOptions.range &&
        verifiedOptions.from >= verifiedOptions.to - verifiedOptions.gap
      ) {
        verifiedOptions.from =
          verifiedOptions.step >= verifiedOptions.gap
            ? verifiedOptions.to - verifiedOptions.step
            : verifiedOptions.to -
              verifiedOptions.gap -
              ((verifiedOptions.to - verifiedOptions.gap) %
                verifiedOptions.step);
      }
    }

    return verifiedOptions as ModelOption;
  }

  public changeOptions(options: ModelOption, action?: ActionEnum) {
    this.options = this.checkOptions(options, action);
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
