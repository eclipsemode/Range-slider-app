import $ from "jquery";
import Controller from "./Controller";

const app = new Controller("#slider", {
  // min: 1000,
  max: 104,
  tooltip: true,
  from: 50,
  // to: 500,
  // range: true,
  configPanel: true,
  step: 1,
  // to: 2000,
  vertical: true,
  gap: 1,
});
