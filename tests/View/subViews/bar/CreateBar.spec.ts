import $ from "jquery";
import { CreateBar } from "../../../../src/View/subViews";

describe("CreateBar test", () => {
  const bar = new CreateBar($("body"));
  test("Should define bar", () => {
    expect(bar).toBeDefined();
  });
  test("Should have lenght", () => {
    expect(bar.barElement).toHaveLength(1);
  });
  test("Should define bar element", () => {
    expect($(".slider-app__bar")).toBeDefined();
  });
});
