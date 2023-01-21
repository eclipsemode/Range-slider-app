import $ from "jquery";
import { CreateRulers } from "../../../../src/View/subViews";

describe("Create Rulers tests", () => {
  const body: JQuery = $("body");
  const valuesArr: number[] = [1, 10, 20, 30, 40, 50];
  const pixelsArr: number[] = [1, 10, 20, 30, 40, 50];
  let rulers: CreateRulers;

  beforeEach(() => {
    rulers = new CreateRulers(body, valuesArr, pixelsArr, false);
  });
  test("Should be defined", () => {
    expect(rulers.rulersElement).toBeDefined();
  });
  test("Should not match snapshot vertical", () => {
    expect(rulers.rulersElement[0].innerHTML).toMatchSnapshot(
      "slider-app__rulers"
    );
  });
  test("Should not to be null", () => {
    expect(rulers.rulersElement).not.toBeNull();
  });
  test("Should match values", () => {
    expect(rulers.rulersElement[0].innerHTML).toMatch("20");
  });
});
