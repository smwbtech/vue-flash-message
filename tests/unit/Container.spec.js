import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createContainerMixin } from '@/components/mixins/container.js';
import { createEventBus } from '@/components/eventbus.js';
import Vue from 'vue';
import ContainerExt from '@/components/extends/container.js';
import MyPlugin from '@/components/index.js';

// default config
let config = {
    name: 'flashMessage',
    tag: 'FlashMessage',
    time: 8000,
    icon: true,
    strategy: 'single'
};

// Create an EventBus
const EventBus = new Vue( createEventBus(config) );
// Global access to flashMessage property
Vue.prototype[config.name] = EventBus;

let Container = ContainerExt.extend( createContainerMixin(config) );

//Set up component

let localVue = createLocalVue();
localVue.use(MyPlugin, config);

describe('Test FlashMessage Compoent', () => {

    let cmp;

    beforeEach( () => {
        cmp = shallowMount(Container, {
            localVue
        });
    });

    it('Test container "styles" prop', () => {
        cmp.setProps({
            styles: {
                top: '20px'
            }
        });
        expect(cmp.props().styles.top).toBe('20px');
    });

    it('Test container "style" attribute', () => {
        cmp.setProps({
            styles: {
                top: '20px'
            }
        });
        expect(cmp.attributes().style).toContain('20px');
    });

});
