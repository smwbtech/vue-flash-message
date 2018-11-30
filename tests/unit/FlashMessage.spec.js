import { shallowMount, createLocalVue } from '@vue/test-utils';
import FlashMessage  from '@/components/FlashMessage.vue';
import MyPlugin from '@/components/index.js';

let config = {
    name: 'flashMessage',
    strategy: 'bus'
};
let localVue = createLocalVue();
localVue.use(MyPlugin, config);



describe('Test FlashMessage Compoent', () => {

    let cmp;

    describe('FlashMesage with "bus" strategy', () => {

        beforeEach( () => {
            cmp = shallowMount(FlashMessage, {
                localVue
            });
        });

        describe('Testing default data set', () => {

            it('FlashMesage has property "timeoutId" and it is equal to "undefined"', () => {
                expect(cmp.vm).toHaveProperty('timeoutId', undefined);
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

            it('FlashMesage has property "style.flashMessageStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('style.flashMessageStyle', null);
            });

            it('FlashMesage has property "style.iconStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('style.iconStyle', null);
            });

            it('FlashMesage has property "style.contentStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('style.contentStyle', null);
            });

            it('FlashMesage has property "style.titleStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('style.titleStyle', null);
            });

            it('FlashMesage has property "style.textStyle" and it is an qual to "null"', () => {
                expect(cmp.vm).toHaveProperty('style.textStyle', null);
            });

        });

        describe('Testing calls of EventBus methods', () => {

            it(`Component has access to the EventBus alias "${config.name}" => method "show()"`, () => {
                expect(typeof cmp.vm[config.name].show).toBe('function');
            });

            it('Call method "show()" with arguments should change data in component',  (done) => {
                cmp.vm[config.name].show({status: 'error', title: 'Error Title', message: 'Error Message Text'});
                cmp.vm.$nextTick( () => {
                    expect(cmp.vm.status).toBe('error');
                    expect(cmp.vm.title).toBe('Error Title');
                    expect(cmp.vm.message).toBe('Error Message Text')
                    done();
                });
            });

        });

        describe('Testing component events', () => {

            it('"click" event should invoke component "clearData()" method', (done) => {
                const stub = jest.fn();
                cmp.setMethods({ clearData: stub });
                cmp.vm[config.name].show({status: 'error', title: 'Error Title', message: 'Error Message Text'});
                cmp.vm.$nextTick( () => {
                    let element  = cmp.find('.error-body').trigger('click');
                    expect(stub).toBeCalled();
                    done();
                });

            });

            it('Component should be cleared after "click" event', (done) => {
                cmp.vm[config.name].show({status: 'error', title: 'Error Title', message: 'Error Message Text'});
                cmp.vm.$nextTick( () => {
                    let element  = cmp.find('.error-body').trigger('click');
                    expect(cmp.vm.message).toBe('');
                    done();
                });

            });

        });






    });


});
