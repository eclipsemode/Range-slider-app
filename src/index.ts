import Controller from "./Controller";

const app = new Controller("#slider", {
  // min: 1000,
  max: 2022,
  tooltip: true,
  // from: 250,
  // to: 500,
  range: true,
  configPanel: true,
  step: 20,
  // to: 2000,
});
