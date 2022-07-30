import $ from 'jquery';

import MainClass from '../../components/mainClass/MainClass';

function setSlider(): void {
    const mainClass = new MainClass(this.selectorState);
    mainClass.getMainClass();
    $(this.selectorState).addClass('root');
}

export default setSlider;