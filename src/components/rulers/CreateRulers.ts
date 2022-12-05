import $ from "jquery";

class CreateRulers {
  private readonly selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  getRulers(): JQuery {
    return $(`
            <div class="slider-app__rulers js-slider-app__rulers"></div>
                <div class="slider-app__rulers-values js-slider-app__rulers-values">
                    <div class="slider-app__rulers-values--0"><span>0</span></div>
                    <div class="slider-app__rulers-values--20"><span>20</span></div>
                    <div class="slider-app__rulers-values--40"><span>40</span></div>
                    <div class="slider-app__rulers-values--60"><span>60</span></div>
                    <div class="slider-app__rulers-values--80"><span>80</span></div>
                    <div class="slider-app__rulers-values--100"><span>100</span></div>
                </div>
        `).prependTo(`${this.selector} .slider-app`);
  }
}

export default CreateRulers;
