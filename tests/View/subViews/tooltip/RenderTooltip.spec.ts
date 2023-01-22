import $ from "jquery";
import {
  CreateBar,
  CreateTooltip,
  RenderTooltip,
} from "../../../../src/View/subViews";
import ModelOption from "../../../../src/utils/ModelOption";

describe("Render Tooltip tests", () => {
  const body: JQuery = $("body");
  const bar: CreateBar = new CreateBar(body);
  const tooltip: CreateTooltip = new CreateTooltip(body);
  const options: ModelOption = {
    max: 104,
    tooltip: true,
    range: false,
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
  test("Should be defined", () => {
    const renderTooltip: RenderTooltip = new RenderTooltip(
      options,
      tooltip,
      tooltip,
      bar
    );
    expect(renderTooltip.tooltipFrom).toBeDefined();
    expect(renderTooltip.tooltipTo).toBeNull();
  });
  test("Should be defined tooltip TO", () => {
    const renderTooltip: RenderTooltip = new RenderTooltip(
      { ...options, range: true },
      tooltip,
      tooltip,
      bar
    );
    expect(renderTooltip.tooltipTo).toBeDefined();
  });
  test("Should match snapshot", () => {
    const renderTooltip: RenderTooltip = new RenderTooltip(
      { ...options, range: true },
      tooltip,
      tooltip,
      bar
    );
    expect(
      renderTooltip.tooltipFrom.tooltipElement[0].innerHTML
    ).toMatchSnapshot('class="slider-app__bar"');
  });
  test("Should match className", () => {
    const renderTooltip: RenderTooltip = new RenderTooltip(
      { ...options, range: true, vertical: true },
      tooltip,
      tooltip,
      bar
    );
    expect(renderTooltip.tooltipFrom.tooltipElement[0].className).toMatch(
      "slider-app__tooltip--vertical"
    );
  });
});
