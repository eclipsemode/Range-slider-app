import Controller from "./Controller";

const app = new Controller("#slider", {
  // min: -2000,
  // max: -1000,
  tooltip: true,
  from: 100,
  to: 500,
  range: true,
  // to: 2000,
});
