import $ from "jquery";
import CreateTooltip from "../../src/View/SubViewsOld/tooltip/CreateTooltip";

const className = ".slider";
const tooltip = new CreateTooltip(className);

describe("CreateTooltip line", () => {
  test("Should NOT be undefined", () => {
    expect(tooltip.getTooltipLine()).not.toBeUndefined();
  });

  test("Should be instance of Jquery", () => {
    expect(tooltip.getTooltipLine()).toBeInstanceOf($);
  });

  test("Should append to main parent class", () => {
    expect(tooltip.getTooltipLine().appendTo(className)).toBeTruthy();
  });
});

describe("Tooltip", () => {
  test("Should NOT be undefined", () => {
    expect(tooltip.getTooltip(className.replace(".", ""))).not.toBeUndefined();
  });
});

describe("getFirstTooltip method", () => {
  test("Should call getTooltip method", () => {
    const spy = jest.spyOn(tooltip, "getTooltip");

    tooltip.getFirstTooltip();

    expect(spy).toHaveBeenCalled();
  });
});

describe("getSecondTooltip method", () => {
  test("Should call getTooltip method", () => {
    const spy = jest.spyOn(tooltip, "getTooltip");

    tooltip.getSecondTooltip();

    expect(spy).toHaveBeenCalled();
  });
});
