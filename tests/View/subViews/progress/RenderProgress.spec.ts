import $ from "jquery";
import {
  CreateBar,
  CreateProgress,
  RenderProgress,
} from "../../../../src/View/subViews";
import ModelOption from "../../../../src/utils/ModelOption";

describe("Render Progress test", () => {
  const body: JQuery = $("body");
  const options: ModelOption = {
    max: 104,
    tooltip: true,
    range: true,
    configPanel: true,
    step: 33,
    gap: 1,
    min: 0,
    from: 0,
    to: 99,
    vertical: false,
    rulers: true,
    percent: false,
    color: {
      firstColor: "#ffe53b",
      secondColor: "#ff2525",
      textColor: "#ffe53b",
      thumbColor: "#ffe53b",
    },
    progress: true,
    controlConfig: ["min", "max", "step", "from", "to"],
    toggleConfig: ["vertical", "range", "rulers", "progress", "tooltip"],
  };
  const progress: CreateProgress = new CreateProgress(body);
  const bar: CreateBar = new CreateBar(body);

  test("Should be defined", () => {
    const renderProgress: RenderProgress = new RenderProgress(
      options,
      progress,
      bar
    );
    expect(renderProgress.progress).toBeDefined();
  });
  test("Should match snapshot", () => {
    const renderProgress: RenderProgress = new RenderProgress(
      options,
      progress,
      bar
    );
    expect(renderProgress.progress.progressElement).toMatchSnapshot(
      "slider-app__progress"
    );
  });
  test("Should have length 1", () => {
    const renderProgress: RenderProgress = new RenderProgress(
      options,
      progress,
      bar
    );
    expect(renderProgress.progress.progressElement).toHaveLength(1);
  });
  test("Should match vertical", () => {
    const renderProgress: RenderProgress = new RenderProgress(
      { ...options, vertical: true },
      progress,
      bar
    );
    expect(renderProgress.progress.progressElement[0]).toMatchSnapshot(
      '<div class="slider-app__progress slider-app__progress--vertical" />'
    );
  });
  test("Should not to match element", () => {
    const renderProgress: RenderProgress = new RenderProgress(
      { ...options, progress: false },
      progress,
      bar
    );
    expect(renderProgress.progress).toBe(null);
  });
});
