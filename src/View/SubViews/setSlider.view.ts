import $ from 'jquery';

import { MainClass } from '../../components';

function setSlider(): void {
    const mainClass: MainClass = new MainClass(this.selectorState);
    mainClass.getMainClass();
    const $sliderApp: JQuery = $(`${ this.selectorState } .slider-app`);
    $(this.selectorState).addClass('root');
    $sliderApp.height($sliderApp.width());
}

export default setSlider;