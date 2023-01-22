import $ from "jquery";
import { CreateThumbFrom } from "../../../../src/View/subViews";

describe("Create Thumb From tests", () => {
  const body: JQuery = $("body");
  const thumbFrom: CreateThumbFrom = new CreateThumbFrom(body);
  test("Should be defined", () => {
    expect(thumbFrom.fromThumbElement).toBeDefined();
  });
});
