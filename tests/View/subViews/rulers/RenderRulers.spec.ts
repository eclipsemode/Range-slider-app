import $ from "jquery";
import ModelOption from "../../../../src/utils/ModelOption";
import {
  CreateBar,
  CreateRulers,
  RenderRulers,
} from "../../../../src/View/subViews";

describe("Render Rulers tests", () => {
  const body: JQuery = $("body");
  const bar: CreateBar = new CreateBar(body);
  const valuesArr: number[] = [1, 10, 20, 30, 40, 50];
  const pixelsArr: number[] = [1, 10, 20, 30, 40, 50];
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
  const rulers: CreateRulers = new CreateRulers(
    body,
    valuesArr,
    pixelsArr,
    false
  );
  test("Should be defined", () => {
    const renderRulers: RenderRulers = new RenderRulers(options, rulers, bar);
    expect(renderRulers.rulers).toBeDefined();
  });
  test("Should match snapshot vertical", () => {
    const renderRulers: RenderRulers = new RenderRulers(
      { ...options, vertical: true },
      rulers,
      bar
    );
    expect(renderRulers.rulers.rulersElement[0].innerHTML).toMatchSnapshot(
      "vertical"
    );
  });
  test("Should be null", () => {
    const renderRulers: RenderRulers = new RenderRulers(
      { ...options, rulers: false },
      rulers,
      bar
    );
    expect(renderRulers.rulers).toBeNull();
  });
  test("Should match values", () => {
    const renderRulers: RenderRulers = new RenderRulers(options, rulers, bar);
    expect(renderRulers.rulers.rulersElement[0].innerHTML).toMatch(
      "slider-app__rulers-value"
    );
  });
});
