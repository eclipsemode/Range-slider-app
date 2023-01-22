import $ from "jquery";
import ModelOption from "../../../src/utils/ModelOption";
import SubscribeRulersClick from "../../../src/View/subscribes/SubscribeRulersClick";

describe("Subscribe Rulers Click", () => {
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
    controlConfig: [],
    toggleConfig: [],
    progress: false,
  };
  let subscribeRulersClick: SubscribeRulersClick;
  test("Should be defined", () => {
    const mockFn = jest.fn();

    body.on("mousedown", (e: JQuery.MouseDownEvent) => {
      subscribeRulersClick = new SubscribeRulersClick(options, mockFn, e);
    });
    body.mousedown();
    expect(subscribeRulersClick).toBeDefined();
  });
});
