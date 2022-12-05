import $ from "jquery";

import { CreateMainClass } from "../../components";

function setSlider(): void {
  const mainClass: CreateMainClass = new CreateMainClass(this.selectorState);
  mainClass.getMainClass();
  $(this.selectorState).addClass("root");
}

export default setSlider;
