import { shallowMount, createLocalVue } from '@vue/test-utils';
import { createMessageMixin } from '@/components/mixins/message.js';
import { createEventBus } from '@/components/eventbus.js';
import Vue from 'vue';
import FlashMessageInstall from '@/components/extends/message.js';
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

let FlashMessageExt = FlashMessageInstall(Vue);
let FlashMessage = FlashMessageExt.extend( createMessageMixin(config) );

//Set up component
let localVue = createLocalVue();
localVue.use(MyPlugin, config);



describe('Test FlashMessage Compoent', () => {

    let cmp;

    describe('FlashMesage with "single" strategy', () => {

        beforeEach( () => {
            cmp = shallowMount(FlashMessage, {
                localVue,
                propsData: {
                    messageObj: {
                        id: 1,
                        status: 'error',
                        title: 'error title',
                        message: 'error message',
                        clickable: true,
                        icon: 'www.icon-link.ru',
                        time: 8000,
                        blockClass: null,
                        iconClass: null,
                        contentClass: null,
                        mounted: null,
                        destroyed: null
                    }
                }
            });
        });

        it('Component should exist', () => {
            expect(cmp.exists()).toBe(true);
        });

        describe('Testing data object of mounted component', () => {

            it('FlashMesage has property "id" and it is equal to "1"', () => {
                   expect(cmp.vm.messageObj.id).toBe(1);
            });

            it('FlashMesage has property "timeoutId" and it equal to "undefined"', () => {
                expect(typeof cmp.vm.timeoutId).toBe('number');
            });

            it('FlashMesage has property "time" and it is equal to "8000"', () => {
                expect(cmp.vm.messageObj.time).toBe(8000);
            });

            it('FlashMesage has property "status" and it is equal to "error"', () => {
                expect(cmp.vm.messageObj.status).toBe('error');
            });

            it('FlashMesage has property "title" and it is equal to "error title"', () => {
                expect(cmp.vm.messageObj.title).toBe('error title');
            });

            it('FlashMesage has property "message" and it is equal to "error message"', () => {
                expect(cmp.vm.messageObj.message).toBe('error message');
            });

            it('FlashMesage has property "icon" and it is equal to "www.icon-link.ru"', () => {
                expect(cmp.vm.messageObj.icon).toBe('www.icon-link.ru');
            });

            it('FlashMesage has property "clickable" and it is equal to "true"', () => {
                expect(cmp.vm.messageObj.clickable).toBe(true);
            });

            it('FlashMesage has property "blockClass" and it is an qual to "null"', () => {
                expect(cmp.vm.messageObj.blockClass).toBe(null);
            });

            it('FlashMesage has property "iconClass" and it is an qual to "null"', () => {
                expect(cmp.vm.messageObj.iconClass).toBe(null);
            });

            it('FlashMesage has property "contentClass" and it is an qual to "null"', () => {
                expect(cmp.vm.messageObj.contentClass).toBe(null);
            });

            it('FlashMesage has property "mounted" and it is an qual to "null"', () => {
                expect(cmp.vm.messageObj.mounted).toBe(null);
            });

            it('FlashMesage has property "destroyed" and it is an qual to "null"', () => {
                expect(cmp.vm.messageObj.destroyed).toBe(null);
            });

        });

        // describe('Test classes', () => {
        //
        //     it('When user set "iconClass" element sould have specified class', () => {
        //         cmp.setData({blockClass: 'custom-user-class'});
        //         let elem = cmp.find('._vue-flash-msg-body');
        //         expect(elem.is('div')).toBe(true);
        //         expect(elem.classes()).toContain('custom-user-class');
        //     });
        //
        // });

        // describe('Testing component events', () => {
        //
        //     it('"click" event should invoke component "clearData()" method', (done) => {
        //         const stub = jest.fn();
        //         cmp.setMethods({ clearData: stub });
        //         cmp.find('._vue-flash-msg-body').trigger('click');
        //         cmp.vm.$nextTick( () => {
        //             expect(stub).toBeCalled();
        //             done();
        //         });
        //     });
        // });

    });
});
