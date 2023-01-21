import $ from "jquery";
import { CreateBar } from "../../../../src/View/subViews";

describe("CreateBar test", () => {
  const body: JQuery = $("body");
  const bar = new CreateBar(body);
  test("Should define bar", () => {
    expect(bar).toBeDefined();
  });
  test("Should have length", () => {
    expect(bar.barElement).toHaveLength(1);
  });
  test("Should define bar element", () => {
    expect(bar.barElement).toBeDefined();
  });
  test("Should match snapshot", () => {
    expect(body).toMatchSnapshot('class="slider-app__bar"');
  });
  test("Should match parent", () => {
    expect(bar.barElement.parent().parent()[0].innerHTML).toMatch("body");
  });
});
