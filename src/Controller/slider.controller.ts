import ModelOption from '../utils/ModelOption';
import ObserverEvents from '../Observer/ObserverEvents';
import Observer from '../Observer/Observer';

import View from '../View/slider.view';
import Model from '../Model/slider.model';


class Controller extends Observer {
    private model: Model;
    private view: View;

    constructor(private selector: string, private options?: Partial<ModelOption>) {
        super();
        this.model = new Model(options);
        this.view = new View(selector, this.model.optionsState);

        this.init();
    }

    init() {
        this.view.render();
    }
}

export default Controller;