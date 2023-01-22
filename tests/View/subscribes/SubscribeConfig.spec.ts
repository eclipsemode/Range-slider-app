import $ from "jquery";
import ModelOption from "../../../src/utils/ModelOption";
import SubscribeConfig from "../../../src/View/subscribes/SubscribeConfig";

describe("Subscribe Config tests", () => {
  const body: JQuery = $("body");
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
  let subscribeConfig: SubscribeConfig;

  test("Should be defined", () => {
    const mockFn = jest.fn();

    body.on("mousedown", (e: JQuery.TriggeredEvent) => {
      subscribeConfig = new SubscribeConfig(options, mockFn, e);
    });
    body.mousedown();
    expect(subscribeConfig).toBeDefined();
  });
});
