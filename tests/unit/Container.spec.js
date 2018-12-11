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

let InstallContainer = ContainerExt(Vue);
let Container = InstallContainer.extend( createContainerMixin(config) );

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

    it('Component should exist', () => {
        expect(cmp.exists()).toBe(true);
    });

    it('Component has computed property "strategy" and it is equal to "single"', () => {
        expect(cmp.vm).toHaveProperty('strategy', 'single');
    });

    it('Component has computed property "showMessage" and it is equal to "false"', () => {
        expect(cmp.vm).toHaveProperty('showMessage', false);
    });

    it('Component has computed property "message" and it is equal to "undefined"', () => {
        expect(cmp.vm).toHaveProperty('message', undefined);
    });

    it('Component has computed property "messages" and it is equal to "[]"', () => {
        expect(cmp.vm).toHaveProperty('messages');
        expect(cmp.vm.messages).toEqual([]);
    });

});
