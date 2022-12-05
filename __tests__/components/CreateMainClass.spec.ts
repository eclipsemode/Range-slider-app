import $ from "jquery";
import { CreateMainClass } from "../../src/components";

describe("Main class element", () => {
  const className = ".slider";
  const mainClass = new CreateMainClass(className);

  test("Should NOT be undefined", () => {
    expect(mainClass.getMainClass()).not.toBeUndefined();
  });

  test("Should be instance of Jquery", () => {
    expect(mainClass.getMainClass()).toBeInstanceOf($);
  });
});
