// load "./assets/style/style.scss" file directly in Pug via require()
import { Slider } from "./Controller";

// eslint-disable-next-line no-new
new Slider(".slider", {
  configPanel: true,
  tooltip: true,
  range: false,
  min: -1000,
});
