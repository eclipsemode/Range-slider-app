import $ from "jquery";
import { CreateConfig } from "../../../../src/View/subViews";

describe("Create Config test", () => {
  const body: JQuery = $("body");
  const elementConfig: CreateConfig = new CreateConfig(
    body,
    ["one", "two", "three"],
    ["four", "five"]
  );
  test("Should be defined", () => {
    expect(elementConfig).toBeDefined();
  });
  test("Should match element", () => {
    expect(elementConfig.configElement[0].innerHTML).toMatch("five");
  });
  test("Should have length toggles", () => {
    expect($(".slider-app__toggle-box")).toHaveLength(3);
  });
  test("Should have length controls", () => {
    expect($(".slider-app__control-input")).toHaveLength(2);
  });
  test("Should match snapshot", () => {
    expect(body).toMatchSnapshot(elementConfig.configElement[0].innerHTML);
  });
});
