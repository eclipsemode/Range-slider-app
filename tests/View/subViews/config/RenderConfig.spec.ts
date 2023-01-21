import $ from "jquery";
import { RenderConfig, CreateConfig } from "../../../../src/View/subViews";
import ModelOption from "../../../../src/utils/ModelOption";

describe("Render Config test", () => {
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
    progress: false,
    controlConfig: ["min", "max", "step", "from", "to"],
    toggleConfig: ["vertical", "range", "rulers", "progress", "tooltip"],
  };
  const config: CreateConfig = new CreateConfig(
    body,
    ["one", "two", "second", "Lorem", "Ipsum"],
    ["three", "four", "five", "six"]
  );

  test("Should be defined", () => {
    const renderConfig: RenderConfig = new RenderConfig(options, config, body);
    expect(renderConfig.config).toBeDefined();
  });

  test("Should match snapshot", () => {
    const renderConfig: RenderConfig = new RenderConfig(options, config, body);
    expect(body).toMatchSnapshot(
      renderConfig.config.configElement[0].innerHTML
    );
  });
  test("Should", () => {
    options.configPanel = false;
    const renderConfig: RenderConfig = new RenderConfig(options, config, body);
    expect(renderConfig.config).toBe(null);
  });
});
