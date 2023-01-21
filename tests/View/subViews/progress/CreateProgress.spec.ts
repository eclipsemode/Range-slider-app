import $ from "jquery";
import { CreateProgress } from "../../../../src/View/subViews";

describe("Create Progress test", () => {
  const body: JQuery = $("body");
  const progress: CreateProgress = new CreateProgress(body);
  test("Should be defined", () => {
    expect(progress.progressElement).toBeDefined();
  });
});
