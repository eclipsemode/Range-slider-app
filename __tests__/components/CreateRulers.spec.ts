import $ from "jquery";
import CreateRulers from "../../src/View/SubViewsOld/rulers/CreateRulers";

describe("CreateProgress element", () => {
  const className = ".slider";
  const rulers = new CreateRulers(className);

  test("Should NOT be undefined", () => {
    expect(rulers.getRulers()).not.toBeUndefined();
  });

  test("Should be instance of Jquery", () => {
    expect(rulers.getRulers()).toBeInstanceOf($);
  });

  test("Should append to main parent class", () => {
    expect(rulers.getRulers().appendTo(className)).toBeTruthy();
  });
});
