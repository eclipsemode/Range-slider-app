import ConfigPanel from '../../src/components/configPanel/ConfigPanel';
import $ from 'jquery';
import {clearCaches} from '@typescript-eslint/parser';

const newControlConfig = ['min', 'max', 'step', 'from', 'to'];
const newToggleConfig = ['vertical', 'range', 'rulers', 'progress', 'tooltip'];
const newSelector = '.slider';
const newConfigPanel = new ConfigPanel(newSelector, newControlConfig, newToggleConfig);

describe('getConfig method', () => {

    beforeEach(() => {
        newConfigPanel.getConfig();
    });

    afterEach(() => {
        clearCaches();
    });

    test('Should NOT be undefined', () => {
        expect(newConfigPanel.getConfig).not.toBeUndefined();
    });

    test('Should be truthy', () => {
        expect(newConfigPanel.getConfig).toBeTruthy();
    });

    test('Should have length 0', () => {
        expect(newConfigPanel.getConfig).toHaveLength(0);
    });

    test('Should call a function', () => {
        const f = ConfigPanel.prototype.getConfig = jest.fn();

        f();

        expect(f).toHaveBeenCalledTimes(1);
    });

    test('Should call getConfig method', () => {
        const spy = jest.spyOn(newConfigPanel, 'getConfig');

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveLength(0);
    });
});

describe('getMain method', () => {
    test('Should ', () => {
        expect($(`<div class="slider-app__config">
                        <div class="slider-app__config-section slider-app__config-section--control"></div>
                        <div class="slider-app__config-section slider-app__config-section--toggle"></div>
                    </div>`).parent(newSelector)).toBeTruthy();
    });
});

describe('getControls method', () => {

    test('Should have an id', () => {
        newControlConfig.forEach(name => {
            expect($('.slider-app__config-section--control')
                .find($(`#slider__control-${name}`))).toBeTruthy();
        });
    });

    test('Should match control names', () => {
        newControlConfig.forEach(name => {
            expect(newControlConfig.join(', ')).toMatch(name);
        });
    });
});

describe('getToggles method', () => {
    test('Should match toggle names', () => {
        newToggleConfig.forEach(name => {
            expect(newToggleConfig.join(', ')).toMatch(name);
        });
    });
});