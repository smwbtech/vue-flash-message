import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMessageMixin } from '@/components/mixins/message.js';
import { createEventBus } from '@/components/eventbus.js';
import Vue from 'vue';
import FlashMessageExt from '@/components/extends/message.js';
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

let FlashMessage = FlashMessageExt.extend( createMessageMixin(config) );

//Set up component

let localVue = createLocalVue();
localVue.use(MyPlugin, config);



describe('Test FlashMessage Compoent', () => {

    let cmp;

    describe('FlashMesage with "single" strategy', () => {

        beforeEach( () => {
            cmp = shallowMount(FlashMessage, {
                localVue
            });
        });

        describe('Testing data object of mounted component', () => {

            it('FlashMesage has property "id" and it is equal to "undefined"', () => {
                   expect(cmp.vm).toHaveProperty('id', undefined);
            });

            it('FlashMesage has property "timeoutId" and it is typeof "number"', () => {
                expect(cmp.vm).toHaveProperty('timeoutId');
                expect(typeof cmp.vm.timeoutId).toBe('number');
            });

            it('FlashMesage has property "time" and it is equal to "8000"', () => {
                expect(cmp.vm).toHaveProperty('time', 8000);
            });

            it('FlashMesage has property "status" and it is an empty string', () => {
                expect(cmp.vm).toHaveProperty('status', '');
            });

            it('FlashMesage has property "title" and it is an empty string', () => {
                expect(cmp.vm).toHaveProperty('title', '');
            });

            it('FlashMesage has property "message" and it is an empty string', () => {
                expect(cmp.vm).toHaveProperty('message', '');
            });

            it('FlashMesage has property "icon" and it is equal to "true"', () => {
                expect(cmp.vm).toHaveProperty('icon', true);
            });

            it('FlashMesage has property "clickable" and it is equal to "true"', () => {
                expect(cmp.vm).toHaveProperty('clickable', true);
            });

            it('FlashMesage has property "flashMessageStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('flashMessageStyle', null);
            });

            it('FlashMesage has property "iconStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('iconStyle', null);
            });

            it('FlashMesage has property "style.contentStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('contentStyle', null);
            });

            it('FlashMesage has property "titleStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('titleStyle', null);
            });

            it('FlashMesage has property "textStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('textStyle', null);
            });

        });


        describe('Testing component events', () => {

            it('"click" event should invoke component "clearData()" method', (done) => {
                const stub = jest.fn();
                cmp.setMethods({ clearData: stub });
                cmp.find('._vue-flash-msg-body').trigger('click');
                cmp.vm.$nextTick( () => {
                    expect(stub).toBeCalled();
                    done();
                });
            });
        });

    });
});
