import $ from "jquery";
import CreateProgress from "../../src/View/SubViewsOld/progress/CreateProgress";

describe("CreateProgress element", () => {
  const className = ".slider";
  const progress = new CreateProgress(className);

  test("Should NOT be undefined", () => {
    expect(progress.getProgress).not.toBeUndefined();
  });

  test("Should be instance of jQuery", () => {
    expect(progress.getProgress()).toBeInstanceOf($);
  });
});
