import $ from "jquery";
import CreateRoot from "../../src/View/SubViews/root/CreateRoot";

describe("Main class element", () => {
  const className = ".slider";
  const mainClass = new CreateRoot(className);

  test("Should NOT be undefined", () => {
    expect(mainClass.getMainClass()).not.toBeUndefined();
  });

  test("Should be instance of Jquery", () => {
    expect(mainClass.getMainClass()).toBeInstanceOf($);
  });
});
