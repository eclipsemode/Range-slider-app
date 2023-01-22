import $ from "jquery";
import {
  CreateBar,
  CreateProgress,
  CreateThumbFrom,
  CreateThumbTo,
  RenderThumbs,
} from "../../../../src/View/subViews";
import ModelOption from "../../../../src/utils/ModelOption";

describe("Render Thumbs tests", () => {
  const body: JQuery = $("body");
  const bar: CreateBar = new CreateBar(body);
  const thumbFrom: CreateThumbFrom = new CreateThumbFrom(body);
  const thumbTo: CreateThumbTo = new CreateThumbTo(body);
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
  test("Should be defined", () => {
    const renderThumbs: RenderThumbs = new RenderThumbs(
      options,
      thumbFrom,
      thumbTo,
      bar,
      progress
    );
    expect(renderThumbs.fromThumb).toBeDefined();
    expect(renderThumbs.toThumb).toBeDefined();
  });
  test("Should match vertical", () => {
    const renderThumbs: RenderThumbs = new RenderThumbs(
      { ...options, vertical: true },
      thumbFrom,
      thumbTo,
      bar,
      progress
    );
    expect(`${renderThumbs.fromThumb.fromThumbElement[0].classList}`).toMatch(
      "vertical"
    );
  });
  test("Should match snapshot", () => {
    const renderThumbs: RenderThumbs = new RenderThumbs(
      options,
      thumbFrom,
      thumbTo,
      bar,
      progress
    );
    expect(renderThumbs.toThumb.toThumbElement[0].innerHTML).toMatchSnapshot(
      'class="slider-app__thumb'
    );
  });
  test("Should be a null to thumb", () => {
    const renderThumbs: RenderThumbs = new RenderThumbs(
      { ...options, range: false },
      thumbFrom,
      thumbTo,
      bar,
      progress
    );
    expect(renderThumbs.toThumb).toBeNull();
  });
});
