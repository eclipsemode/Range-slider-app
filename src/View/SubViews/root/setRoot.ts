import $ from "jquery";

import CreateRoot from "./CreateRoot";

function setRoot(): void {
  const mainClass: CreateRoot = new CreateRoot(this.selectorState);
  mainClass.getMainClass();
  $(this.selectorState).addClass("root");
}

export default setRoot;
