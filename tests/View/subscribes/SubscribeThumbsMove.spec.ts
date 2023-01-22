import $ from "jquery";
import {
  CreateBar,
  CreateThumbFrom,
  CreateThumbTo,
} from "../../../src/View/subViews";
import ModelOption from "../../../src/utils/ModelOption";
import SubscribeThumbsMove from "../../../src/View/subscribes/SubscribeThumbsMove";

describe("Subscribe Bar Click tests", () => {
  const body: JQuery = $("body");
  const bar: CreateBar = new CreateBar(body);
  const fromThumb: CreateThumbFrom = new CreateThumbFrom(body);
  const toThumb: CreateThumbTo = new CreateThumbTo(body);
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
  let subscribeThumbsMove: SubscribeThumbsMove;

  test("Should have been called", () => {
    const mockFn = jest.fn();

    body.on("mousedown", (e: JQuery.MouseDownEvent) => {
      subscribeThumbsMove = new SubscribeThumbsMove(
        body,
        options,
        bar,
        fromThumb,
        toThumb,
        mockFn,
        e
      );
    });
    body.mousedown();
    expect(subscribeThumbsMove).toBeDefined();
  });
});
