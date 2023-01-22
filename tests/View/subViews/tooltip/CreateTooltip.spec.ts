import $ from "jquery";
import { CreateTooltip } from "../../../../src/View/subViews";

describe("Create Tooltip tests", () => {
  const body: JQuery = $("body");
  const tooltip: CreateTooltip = new CreateTooltip(body);
  test("Should be defined", () => {
    expect(tooltip.tooltipElement).toBeDefined();
  });
  test("Should match snapshot", () => {
    expect(body).toMatchSnapshot('class="slider-app__tooltip');
  });
});
