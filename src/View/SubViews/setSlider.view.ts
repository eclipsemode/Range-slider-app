import $ from 'jquery';

import { MainClass } from '../../components';

function setSlider(): void {
    const mainClass: MainClass = new MainClass(this.selectorState);
    mainClass.getMainClass();
    $(this.selectorState).addClass('root');
}

export default setSlider;