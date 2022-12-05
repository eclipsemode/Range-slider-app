import $ from "jquery";
import { CreateBar } from "../../src/components";

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
