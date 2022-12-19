import $ from "jquery";
import CreateBar from "../../src/View/SubViewsOld/bar/CreateBar";

describe("CreateBar element", () => {
  const className = ".slider";
  const bar = new CreateBar(className);

  test("Should NOT be undefined", () => {
    expect(bar.getBar).not.toBeUndefined();
  });

  test("Should be instance of Jquery", () => {
    expect(bar.getBar()).toBeInstanceOf($);
  });
});
