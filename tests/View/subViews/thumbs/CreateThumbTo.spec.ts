import $ from "jquery";
import { CreateThumbTo } from "../../../../src/View/subViews";

describe("Create Thumb From tests", () => {
  const body: JQuery = $("body");
  const thumbTo: CreateThumbTo = new CreateThumbTo(body);
  test("Should be defined", () => {
    expect(thumbTo.toThumbElement).toBeDefined();
  });
});
