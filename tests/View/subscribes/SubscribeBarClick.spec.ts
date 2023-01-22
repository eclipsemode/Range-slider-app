import $ from "jquery";
import SubscribeBarClick from "../../../src/View/subscribes/SubscribeBarClick";
import ModelOption from "../../../src/utils/ModelOption";
import { CreateBar } from "../../../src/View/subViews";

describe("Subscribe Bar Click tests", () => {
  const body: JQuery = $("body");
  const bar: CreateBar = new CreateBar(body);
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
  let subscribeBarClick: SubscribeBarClick;

  test("Should have been called", () => {
    const mockFn = jest.fn();

    body.on("mousedown", (e: JQuery.MouseDownEvent) => {
      subscribeBarClick = new SubscribeBarClick(options, bar, mockFn, e);
    });
    body.mousedown();
    expect(subscribeBarClick).toBeDefined();
  });
  test("Should have been called", () => {
    const mockFn = jest.fn();

    body.on("mousedown", (e: JQuery.MouseDownEvent) => {
      subscribeBarClick = new SubscribeBarClick(options, bar, mockFn, e);
    });
    body.mousedown();
    expect(mockFn).toHaveBeenCalled();
  });
});
